import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodo } from '../models/todo';
import { Observable, tap } from 'rxjs';
import { CreateTodoDto } from '../models/create-todo-dto';
import { CategoriesService } from './categories.service';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(
    private httpClient: HttpClient,
    private categoriesService: CategoriesService
  ) {}

  getAll(): Observable<ITodo[]> {
    return this.httpClient.get<ITodo[]>('http://localhost:5000/todos');
  }

  create(todo: CreateTodoDto): Observable<ITodo> {
    return this.httpClient
      .post<ITodo>('http://localhost:5000/todos', todo)
      .pipe(
        tap((todo) => {
          this.categoriesService.categories =
            this.categoriesService.categories.map((cat) => {
              if (cat.id === todo.categoryId) {
                cat.todos.push(todo);
              }
              return cat;
            });
        })
      );
  }
}
