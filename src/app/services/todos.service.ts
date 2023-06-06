import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodo } from '../models/todo';
import { Observable, tap } from 'rxjs';
import { CreateTodoDto } from '../models/dto/create-todo-dto';
import { CategoriesService } from './categories.service';
import { ICategory } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  selectedTodos: ITodo[] = [];

  constructor(
    private httpClient: HttpClient,
    private categoriesService: CategoriesService
  ) {}

  selectTodo(todo: ITodo) {
    this.selectedTodos.push(todo);
  }

  unSelectTodo(todo: ITodo) {
    const newSelectedTodos = this.selectedTodos.filter((t) => t.id !== todo.id);
    this.selectedTodos = newSelectedTodos;
  }

  //Нужен?:
  getAll(): Observable<ITodo[]> {
    return this.httpClient.get<ITodo[]>('http://localhost:5000/todos');
  }

  create(todo: CreateTodoDto): Observable<ITodo> {
    return this.httpClient
      .post<ITodo>('http://localhost:5000/todos', todo)
      .pipe(
        tap((todo) => {
          this.categoriesService.categories = [
            ...this.categoriesService.categories,
          ].map((cat) => {
            if (cat.id === todo.category.id) {
              cat.todos.push(todo);
            }
            return cat;
          });
        })
      );
  }

  deleteMany(): Observable<ITodo> {
    const queryIds = this.selectedTodos.map((t) => t.id).join(',');
    return this.httpClient
      .delete<ITodo>(`http://localhost:5000/todos/${queryIds}`)
      .pipe(
        tap(() => {
          const newCategories = [...this.categoriesService.categories].reduce<
            ICategory[]
          >((acc, cat) => {
            this.selectedTodos.forEach((todo) => {
              if (cat.id === todo.category.id) {
                const index = cat.todos.findIndex((t) => t.id === todo.id);

                if (index !== -1) {
                  cat.todos.splice(index, 1);
                }
              }
            });
            acc.push(cat);
            return acc;
          }, []);

          this.categoriesService.categories = newCategories;
          this.selectedTodos = [];
        })
      );
  }

  delete(todo: ITodo): Observable<ITodo> {
    return this.httpClient
      .delete<ITodo>(`http://localhost:5000/todos/${todo.id}`)
      .pipe(
        tap(() => {
          this.categoriesService.categories = [
            ...this.categoriesService.categories,
          ].map((cat) => {
            if (cat.id === todo.category.id) {
              const newTodos = [...cat.todos].filter((t) => t.id !== todo.id);
              return { ...cat, todos: newTodos };
            }
            return cat;
          });
        })
      );
  }
}
