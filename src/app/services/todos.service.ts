import { Injectable } from '@angular/core';
import { ITodo } from '../models/todo';
import { Subscription, take } from 'rxjs';
import { ICreateTodoDto } from '../models/dto/create-todo.dto';
import { CategoriesService } from './categories.service';
import { ICategory } from '../models/category';
import { ApiService } from '../api.service';
import { IUpdateTodoDto } from '../models/dto/update-todo.dto';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  selectedTodos: ITodo[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private apiService: ApiService
  ) {}

  selectTodo(todo: ITodo) {
    this.selectedTodos.push(todo);
  }

  unSelectTodo(todo: ITodo) {
    const newSelectedTodos = this.selectedTodos.filter((t) => t.id !== todo.id);
    this.selectedTodos = newSelectedTodos;
  }

  //Нужен?:
  // getAll(): Observable<ITodo[]> {
  //   return this.httpClient.get<ITodo[]>('http://localhost:5000/todos');
  // }

  update(id: ITodo['id'], updateTodoDto: IUpdateTodoDto) {
    return this.apiService
      .updateTodo(id, updateTodoDto)
      .pipe()
      .subscribe((todo) => {
        const updatedCategories = [
          ...this.categoriesService.categories$.getValue(),
        ].map((cat) => {
          if (cat.id === todo.categoryId) {
            const newCat = { ...cat };
            const index = newCat.todos.findIndex((t) => t.id === todo.id);

            if (index !== -1) {
              newCat.todos.splice(index, 1, todo);
            }
            return newCat;
          }

          return cat;
        });
        console.log('asd update categories$.next', updatedCategories);
        this.categoriesService.categories$.next(updatedCategories);
      });
  }

  create(todoDto: ICreateTodoDto): Subscription {
    return this.apiService.createTodo(todoDto).subscribe((todo) => {
      const updatedCategories = [
        ...this.categoriesService.categories$.getValue(),
      ].map((category) => {
        const newCategory = { ...category }; ////???????????????/
        if (category.id === todo.category?.id) {
          newCategory.todos.push(todo);
          return newCategory;
        }
        return category;
      });
      console.log('asd create categories$.next');
      this.categoriesService.categories$.next(updatedCategories);
    });
  }

  deleteMany(): Subscription {
    const queryIds = this.selectedTodos.map((t) => t.id).join(',');

    return this.apiService
      .deleteTodos(queryIds)
      .pipe()
      .subscribe((deletedTodos) => {
        const deletedTodosCategoryIds = deletedTodos.map((t) => t.categoryId);
        const newCategories = this.categoriesService.categories$
          .getValue()
          .reduce<ICategory[]>((acc, cat) => {
            if (deletedTodosCategoryIds.includes(cat.id)) {
              const newCat = { ...cat };
              deletedTodos.forEach((todo) => {
                if (newCat.id === todo.categoryId) {
                  const index = newCat.todos.findIndex((t) => t.id === todo.id);

                  if (index !== -1) {
                    newCat.todos.splice(index, 1);
                  }
                }
              });
              acc.push(newCat);
            } else {
              acc.push(cat);
            }

            return acc;
          }, []);

        this.categoriesService.categories$.next(newCategories);

        this.selectedTodos = [];
      });
  }

  delete(todo: ITodo): Subscription {
    return this.apiService
      .deleteTodos(String(todo.id))
      .pipe()
      .subscribe((value) => {
        const deleteTodo = value[0];
        const updatedCategories = [
          ...this.categoriesService.categories$.getValue(),
        ].map((cat) => {
          if (cat.id === deleteTodo.categoryId) {
            const newTodos = cat.todos.filter((t) => t.id !== deleteTodo.id);
            return { ...cat, todos: newTodos };
          }
          return cat;
        });

        this.categoriesService.categories$.next(updatedCategories);
      });
  }

  // create(todo: ICreateTodoDto): Observable<ITodo> {
  //   return this.httpClient
  //     .post<ITodo>('http://localhost:5000/todos', todo)
  //     .pipe(
  //       tap((todo) => {
  //         this.categoriesService.categories = [
  //           ...this.categoriesService.categories,
  //         ].map((cat) => {
  //           if (cat.id === todo.category.id) {
  //             cat.todos.push(todo);
  //           }
  //           return cat;
  //         });
  //       })
  //     );
  // }

  // deleteMany(): Observable<ITodo> {
  //   const queryIds = this.selectedTodos.map((t) => t.id).join(',');
  //   return this.httpClient
  //     .delete<ITodo>(`http://localhost:5000/todos/${queryIds}`)
  //     .pipe(
  //       tap(() => {
  //         const newCategories = [...this.categoriesService.categories].reduce<
  //           ICategory[]
  //         >((acc, cat) => {
  //           this.selectedTodos.forEach((todo) => {
  //             if (cat.id === todo.category.id) {
  //               const index = cat.todos.findIndex((t) => t.id === todo.id);

  //               if (index !== -1) {
  //                 cat.todos.splice(index, 1);
  //               }
  //             }
  //           });
  //           acc.push(cat);
  //           return acc;
  //         }, []);

  //         this.categoriesService.categories = newCategories;

  //         this.selectedTodos = [];
  //       })
  //     );
  // }

  // delete(todo: ITodo): Observable<ITodo> {
  //   return this.httpClient
  //     .delete<ITodo>(`http://localhost:5000/todos/${todo.id}`)
  //     .pipe(
  //       tap(() => {
  //         this.categoriesService.categories = [
  //           ...this.categoriesService.categories,
  //         ].map((cat) => {
  //           if (cat.id === todo.category.id) {
  //             const newTodos = [...cat.todos].filter((t) => t.id !== todo.id);
  //             return { ...cat, todos: newTodos };
  //           }
  //           return cat;
  //         });
  //       })
  //     );
  // }
}
