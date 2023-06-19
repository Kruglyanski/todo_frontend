import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, take } from 'rxjs';
import { ICategory } from '../models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICreateCategoryDto } from '../models/dto/create-category.dto';
import { ITodo } from '../models/todo';
import { IUserDto } from '../models/dto/user.dto';
import { IUpdateTodoDto } from '../models/dto/update-todo.dto';
import { ICreateTodoDto } from '../models/dto/create-todo.dto';
import { categoriesQuery } from '../gql/queries';
import {
  ICategoriesQuery,
  ICreateCategoryQuery,
  ICreateTodoQuery,
  IDeleteCategoryQuery,
  IDeleteTodoQuery,
  ILoginQuery,
  IRegisterQuery,
  IUpdateTodoQuery,
} from '../interfaces/queries';
import {
  loginMutation,
  registerMutation,
  createCategoryMutation,
  createTodoMutation,
  deleteCategoryMutation,
  updateTodoMutation,
  deleteTodosMutation,
} from '../gql/mutations';

import { DocumentNode } from 'graphql';

const BASE_URL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public token$ = new BehaviorSubject(localStorage.getItem('token') ?? '');
  public email$ = new BehaviorSubject(localStorage.getItem('email') ?? '');
  constructor(private httpClient: HttpClient) {}

  //GraphQL:

  private fetchGQLData<T>(
    query: DocumentNode,
    variables?: { [key: string]: any }
  ): Observable<T> {
    return this.httpClient.post<T>(
      `${BASE_URL}/graphql`,
      { query: query.loc?.source.body, variables },
      { headers: { authorization: `Bearer ${this.token$.getValue()}` } }
    );
  }

  public getAllCategoriesGQL(): Observable<ICategoriesQuery> {
    return this.fetchGQLData(categoriesQuery);
  }

  public loginGQL(userDto: IUserDto): Subscription {
    return this.fetchGQLData<ILoginQuery>(loginMutation, {
      ...userDto,
    }).subscribe(({ data }) => {
      const token = data.login.token;
      const { email } = userDto;
      this.token$.next(token);
      this.email$.next(userDto.email);
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
    });
  }

  public registerGQL(userDto: IUserDto): Subscription {
    return this.fetchGQLData<IRegisterQuery>(registerMutation, { ...userDto })
      .pipe(take(1))
      .subscribe(({ data }) => {
        const token = data.registration.token;
        const { email } = userDto;
        this.token$.next(token);
        this.email$.next(userDto.email);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
      });
  }

  public createCategoryGQL(
    categoryDto: ICreateCategoryDto
  ): Observable<ICreateCategoryQuery> {
    return this.fetchGQLData(createCategoryMutation, { ...categoryDto });
  }

  public createTodoGQL(todo: ICreateTodoDto): Observable<ICreateTodoQuery> {
    return this.fetchGQLData(createTodoMutation, { ...todo });
  }

  public deleteCategoryGQL(
    categoryId: ICategory['id']
  ): Observable<IDeleteCategoryQuery> {
    return this.fetchGQLData(deleteCategoryMutation, { categoryId });
  }

  public updateTodoGQL(
    todoId: number,
    updateTodoDto: IUpdateTodoDto
  ): Observable<IUpdateTodoQuery> {
    return this.fetchGQLData(updateTodoMutation, {
      todoId,
      updateTodoInput: updateTodoDto,
    });
  }

  public deleteTodosGQL(todoIds: string): Observable<IDeleteTodoQuery> {
    return this.fetchGQLData(deleteTodosMutation, { todoIds });
  }

  //REST:

  public getHeaders(): HttpHeaders {
    const headers: { [key: string]: string } = {};
    headers.Authorization = `Bearer ${this.token$.getValue()}`;

    return new HttpHeaders(headers);
  }

  public register(userDto: IUserDto): Subscription {
    return this.httpClient
      .post<{ token: string }>(`${BASE_URL}/auth/registration`, userDto)
      .pipe(take(1))
      .subscribe(({ token }) => {
        console.log('TOKEN', token);
        this.token$.next(token);
        localStorage.setItem('token', token);
      });
  }

  public login(userDto: IUserDto): Subscription {
    return this.httpClient
      .post<{ token: string }>(`${BASE_URL}/auth/login`, userDto)
      .pipe(take(1))
      .subscribe(({ token }) => {
        console.log('TOKEN', token);
        this.token$.next(token);
        localStorage.setItem('token', token);
      });
  }

  public getAllCategories(): Observable<ICategory[]> {
    return this.httpClient
      .get<ICategory[]>(`${BASE_URL}/categories`, {
        headers: this.getHeaders(),
      })
      .pipe(take(1));
  }

  public createCategory(
    categoryDto: ICreateCategoryDto
  ): Observable<ICategory> {
    return this.httpClient
      .post<ICategory>(`${BASE_URL}/categories`, categoryDto, {
        headers: this.getHeaders(),
      })
      .pipe(take(1));
  }

  public deleteCategory(categoryId: ICategory['id']): Observable<ICategory> {
    return this.httpClient
      .delete<ICategory>(`${BASE_URL}/categories/${categoryId}`, {
        headers: this.getHeaders(),
      })
      .pipe(take(1));
  }

  public createTodo(todo: ICreateTodoDto): Observable<ITodo> {
    return this.httpClient
      .post<ITodo>(`${BASE_URL}/todos`, todo, {
        headers: this.getHeaders(),
      })
      .pipe(take(1));
  }

  public updateTodo(
    todoId: number,
    updateTodoDto: IUpdateTodoDto
  ): Observable<ITodo> {
    return this.httpClient
      .patch<ITodo>(`${BASE_URL}/todos/update/${todoId}`, updateTodoDto, {
        headers: this.getHeaders(),
      })
      .pipe(take(1));
  }

  public deleteTodos(todoIds: string): Observable<ITodo[]> {
    return this.httpClient
      .delete<ITodo[]>(`${BASE_URL}/todos/${todoIds}`, {
        headers: this.getHeaders(),
      })
      .pipe(take(1));
  }
}
