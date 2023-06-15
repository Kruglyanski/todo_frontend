import { Injectable } from '@angular/core';
import { ITodo } from '../models/todo';
import { Subscription } from 'rxjs';
import { CategoriesService } from './categories.service';
import { ICategory } from '../models/category';
import { ApiService } from '../api.service';
import { IUpdateTodoDto } from '../models/dto/update-todo.dto';
import { ICreateTodoDto } from '../models/dto/create-todo.dto';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  selectedTodos: ITodo[] = [];
  filterValue: string;

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

  filterTodos(categories: ICategory[], value: string) {
    if (!value) {
      return categories;
    }

    return categories.reduce<ICategory[]>((acc, cat) => {
      const filteredTodos = cat.todos.filter((todo) =>
        todo.title.toLowerCase().includes(value.toLowerCase())
      );

      acc.push({ ...cat, todos: filteredTodos });
      return acc;
    }, []);
  }

  //GraphQL:

  updateGQL(id: ITodo['id'], updateTodoDto: IUpdateTodoDto) {
    return this.apiService
      .updateTodoGQL(id, updateTodoDto)
      .pipe()
      .subscribe((resp) => {
        const todo = resp.data.updateTodo;
        const updatedCategories = [
          ...this.categoriesService.categories$.getValue(),
        ].map((cat) => {
          if (cat.id === todo.categoryId) {
            const newCat = { ...cat };
            //TODO: разобраться с типами айди
            const index = cat.todos.findIndex((t) => t.id == todo.id);

            if (index !== -1) {
              newCat.todos.splice(index, 1, { ...todo });
            }
            return newCat;
          }

          return cat;
        });
        this.categoriesService.categories$.next(updatedCategories);
      });
  }

  createGQL(todoDto: ICreateTodoDto): Subscription {
    return this.apiService.createTodoGQL(todoDto).subscribe((resp) => {
      const todo = resp.data.createTodo;
      const updatedCategories = [
        ...this.categoriesService.categories$.getValue(),
      ].map((category) => {
        const newCategory = { ...category };
        if (category.id === todo.category?.id) {
          newCategory.todos.push(todo);
          return newCategory;
        }
        return category;
      });

      this.categoriesService.categories$.next(updatedCategories);
    });
  }

  deleteManyGQL(): Subscription {
    const queryIds = this.selectedTodos.map((t) => t.id).join(',');

    return this.apiService
      .deleteTodosGQL(queryIds)
      .pipe()
      .subscribe((resp) => {
        const deletedTodos = resp.data.deleteTodo;
        const deletedTodosCategoryIds = deletedTodos.map((t) => t.categoryId);
        const newCategories = this.categoriesService.categories$
          .getValue()
          .reduce<ICategory[]>((acc, cat) => {
            if (deletedTodosCategoryIds.includes(cat.id)) {
              const newCat = { ...cat };
              deletedTodos.forEach((todo) => {
                if (newCat.id === todo.categoryId) {
                  //TODO: разобраться с типами айди
                  const index = newCat.todos.findIndex((t) => t.id == todo.id);

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

  //REST:

  create(todoDto: ICreateTodoDto): Subscription {
    return this.apiService.createTodo(todoDto).subscribe((todo) => {
      const updatedCategories = [
        ...this.categoriesService.categories$.getValue(),
      ].map((category) => {
        const newCategory = { ...category };
        if (category.id === todo.category?.id) {
          newCategory.todos.push(todo);
          return newCategory;
        }
        return category;
      });

      this.categoriesService.categories$.next(updatedCategories);
    });
  }

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
            //TODO: разобраться с типами айди
            const index = cat.todos.findIndex((t) => t.id == todo.id);

            if (index !== -1) {
              newCat.todos.splice(index, 1, { ...todo });
            }
            return newCat;
          }

          return cat;
        });
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
                  //TODO: разобраться с типами айди
                  const index = newCat.todos.findIndex((t) => t.id == todo.id);

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
}
