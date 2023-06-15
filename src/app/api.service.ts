import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { ICategory } from './models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICreateCategoryDto } from './models/dto/create-category.dto';
import { ITodo } from './models/todo';
import { IUserDto } from './models/dto/user.dto';
import { IUpdateTodoDto } from './models/dto/update-todo.dto';
import { ICreateTodoDto } from './models/dto/create-todo.dto';
import { Apollo, gql } from 'apollo-angular';
import { categoriesQuery } from './gql/queries';
import {
  ICategoriesQuery,
  ICreateCategoryQuery,
  ICreateTodoQuery,
  IDeleteCategoryQuery,
  IDeleteTodoQuery,
  ILoginQuery,
  IRegisterQuery,
  IUpdateTodoQuery,
} from './models/queries';
import {
  loginMutation,
  registerMutation,
  createCategoryMutation,
  createTodoMutation,
  deleteCategoryMutation,
  updateTodoMutation,
  deleteTodosMutation,
} from './gql/mutations';

const BASE_URL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token$ = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) {}

  //GraphQL:

  private fetchGQLData<T>(
    query: string,
    variables?: { [key: string]: any }
  ): Observable<T> {
    const token = localStorage.getItem('token');

    return this.httpClient.post<T>(
      `${BASE_URL}/graphql`,
      { query, variables },
      { headers: { authorization: `Bearer ${token}` } }
    );
  }

  getAllCategoriesGQL(): Observable<ICategoriesQuery> {
    return this.fetchGQLData(categoriesQuery);
  }

  loginGQL(userDto: IUserDto): Observable<ILoginQuery> {
    const variables = {
      email: userDto.email,
      password: userDto.password,
    };
    return this.fetchGQLData(loginMutation, variables);
  }

  registerGQL(userDto: IUserDto): Observable<IRegisterQuery> {
    const variables = {
      email: userDto.email,
      password: userDto.password,
    };
    return this.fetchGQLData(registerMutation, variables);
  }

  createCategoryGQL(
    categoryDto: ICreateCategoryDto
  ): Observable<ICreateCategoryQuery> {
    const variables = {
      title: categoryDto.title,
    };
    return this.fetchGQLData(createCategoryMutation, variables);
  }

  createTodoGQL(todo: ICreateTodoDto): Observable<ICreateTodoQuery> {
    const variables = {
      title: todo.title,
      description: todo.description,
      categoryId: todo.categoryId,
      tag: todo.tag,
    };
    return this.fetchGQLData(createTodoMutation, variables);
  }

  deleteCategoryGQL(
    categoryId: ICategory['id']
  ): Observable<IDeleteCategoryQuery> {
    const variables = {
      categoryId,
    };
    return this.fetchGQLData(deleteCategoryMutation, variables);
  }

  updateTodoGQL(
    todoId: number,
    updateTodoDto: IUpdateTodoDto
  ): Observable<IUpdateTodoQuery> {
    const variables = {
      todoId,
      updateTodoInput: updateTodoDto,
    };
    return this.fetchGQLData(updateTodoMutation, variables);
  }

  deleteTodosGQL(todoIds: string): Observable<IDeleteTodoQuery> {
    const variables = {
      todoIds,
    };
    return this.fetchGQLData(deleteTodosMutation, variables);
  }

  //REST:

  public getHeaders(): HttpHeaders {
    const headers: { [key: string]: string } = {};
    headers.Authorization = `Bearer ${this.token$.getValue()}`;
    return new HttpHeaders(headers);
  }

  register(userDto: IUserDto): Observable<{ token: string }> {
    return this.httpClient
      .post<{ token: string }>(`${BASE_URL}/auth/registration`, userDto)
      .pipe(take(1));
  }

  login(userDto: IUserDto): Observable<{ token: string }> {
    return this.httpClient
      .post<{ token: string }>(`${BASE_URL}/auth/login`, userDto)
      .pipe(take(1));
  }

  getAllCategories(): Observable<ICategory[]> {
    return this.httpClient
      .get<ICategory[]>(`${BASE_URL}/categories`, {
        headers: this.getHeaders(),
      })
      .pipe(take(1));
  }

  createCategory(categoryDto: ICreateCategoryDto): Observable<ICategory> {
    return this.httpClient
      .post<ICategory>(`${BASE_URL}/categories`, categoryDto, {
        headers: this.getHeaders(),
      })
      .pipe(take(1));
  }

  deleteCategory(categoryId: ICategory['id']): Observable<ICategory> {
    return this.httpClient
      .delete<ICategory>(`${BASE_URL}/categories/${categoryId}`, {
        headers: this.getHeaders(),
      })
      .pipe(take(1));
  }

  createTodo(todo: ICreateTodoDto): Observable<ITodo> {
    return this.httpClient
      .post<ITodo>(`${BASE_URL}/todos`, todo, {
        headers: this.getHeaders(),
      })
      .pipe(take(1));
  }

  updateTodo(todoId: number, updateTodoDto: IUpdateTodoDto): Observable<ITodo> {
    return this.httpClient
      .patch<ITodo>(`${BASE_URL}/todos/update/${todoId}`, updateTodoDto, {
        headers: this.getHeaders(),
      })
      .pipe(take(1));
  }

  deleteTodos(todoIds: string): Observable<ITodo[]> {
    return this.httpClient
      .delete<ITodo[]>(`${BASE_URL}/todos/${todoIds}`, {
        headers: this.getHeaders(),
      })
      .pipe(take(1));
  }
}


  // getAllCategoriesGQLApollo() {
  //   const token = localStorage.getItem('token');
  //   return this.apollo.query({
  //     query: gql(categoriesQuery),
  //     context: { headers: { authorization: `Bearer ${token}` } },
  //   });
  // }