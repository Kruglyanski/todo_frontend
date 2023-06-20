import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUserDto } from '../models/dto/user.dto';
import { loginMutation, registerMutation } from '../gql/mutations';
import { DocumentNode } from 'graphql';
import {
  LoginMutation,
  LoginMutationVariables,
  RegisterMutation,
  RegisterMutationVariables,
} from '../gql/mutations-generated-types';

const BASE_URL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public token$ = new BehaviorSubject(localStorage.getItem('token') ?? '');
  public email$ = new BehaviorSubject(localStorage.getItem('email') ?? '');
  constructor(private httpClient: HttpClient) {}

  private setAuthData(token: string, email: string) {
    this.token$.next(token);
    this.email$.next(email);
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  }

  //GraphQL:

  public gqlRequest<T, R>(query: DocumentNode, variables?: R): Observable<T> {
    return this.httpClient
      .post<{ data: T }>(
        `${BASE_URL}/graphql`,
        { query: query.loc?.source.body, variables },
        { headers: { authorization: `Bearer ${this.token$.getValue()}` } }
      )
      .pipe(
        take(1),
        map(({ data }) => data)
      );
  }

  public loginGQL(userDto: IUserDto) {
    return this.gqlRequest<LoginMutation, LoginMutationVariables>(
      loginMutation,
      userDto
    ).subscribe(({ login: { token } }) => {
      this.setAuthData(token, userDto.email);
    });
  }

  public registerGQL(userDto: IUserDto) {
    return this.gqlRequest<RegisterMutation, RegisterMutationVariables>(
      registerMutation,
      userDto
    ).subscribe(({ registration: { token } }) => {
      this.setAuthData(token, userDto.email);
    });
  }

  //REST:

  // public getHeaders(): HttpHeaders {
  //   const headers: { [key: string]: string } = {};
  //   headers.Authorization = `Bearer ${this.token$.getValue()}`;

  //   return new HttpHeaders(headers);
  // }

  // public register(userDto: IUserDto): Subscription {
  //   return this.httpClient
  //     .post<{ token: string }>(`${BASE_URL}/auth/registration`, userDto)
  //     .pipe(take(1))
  //     .subscribe(({ token }) => {
  //       console.log('TOKEN', token);
  //       this.token$.next(token);
  //       localStorage.setItem('token', token);
  //     });
  // }

  // public login(userDto: IUserDto): Subscription {
  //   return this.httpClient
  //     .post<{ token: string }>(`${BASE_URL}/auth/login`, userDto)
  //     .pipe(take(1))
  //     .subscribe(({ token }) => {
  //       console.log('TOKEN', token);
  //       this.token$.next(token);
  //       localStorage.setItem('token', token);
  //     });
  // }

  // public getAllCategories(): Observable<ICategory[]> {
  //   return this.httpClient
  //     .get<ICategory[]>(`${BASE_URL}/categories`, {
  //       headers: this.getHeaders(),
  //     })
  //     .pipe(take(1));
  // }

  // public createCategory(
  //   categoryDto: ICreateCategoryDto
  // ): Observable<ICategory> {
  //   return this.httpClient
  //     .post<ICategory>(`${BASE_URL}/categories`, categoryDto, {
  //       headers: this.getHeaders(),
  //     })
  //     .pipe(take(1));
  // }

  // public deleteCategory(categoryId: ICategory['id']): Observable<ICategory> {
  //   return this.httpClient
  //     .delete<ICategory>(`${BASE_URL}/categories/${categoryId}`, {
  //       headers: this.getHeaders(),
  //     })
  //     .pipe(take(1));
  // }

  // public createTodo(todo: ICreateTodoDto): Observable<ITodo> {
  //   return this.httpClient
  //     .post<ITodo>(`${BASE_URL}/todos`, todo, {
  //       headers: this.getHeaders(),
  //     })
  //     .pipe(take(1));
  // }

  // public updateTodo(
  //   todoId: number,
  //   updateTodoDto: IUpdateTodoDto
  // ): Observable<ITodo> {
  //   return this.httpClient
  //     .patch<ITodo>(`${BASE_URL}/todos/update/${todoId}`, updateTodoDto, {
  //       headers: this.getHeaders(),
  //     })
  //     .pipe(take(1));
  // }

  // public deleteTodos(todoIds: string): Observable<ITodo[]> {
  //   return this.httpClient
  //     .delete<ITodo[]>(`${BASE_URL}/todos/${todoIds}`, {
  //       headers: this.getHeaders(),
  //     })
  //     .pipe(take(1));
  // }
}
