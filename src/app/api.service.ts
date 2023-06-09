import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { ICategory } from './models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICreateCategoryDto } from './models/dto/create-category.dto';
import { ICreateTodoDto } from './models/dto/create-todo.dto';
import { ITodo } from './models/todo';
import { IUserDto } from './models/dto/user.dto';
import { IUpdateTodoDto } from './models/dto/update-todo.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token$ = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) {}

  public getHeaders(): HttpHeaders {
    const headers: { [key: string]: string } = {};
    headers.Authorization = `Bearer ${this.token$.getValue()}`;
    return new HttpHeaders(headers);
  }

  register(userDto: IUserDto): Observable<any> {
    return this.httpClient
      .post<any>('http://localhost:5000/auth/registration', userDto)
      .pipe(take(1));
  }

  login(userDto: IUserDto): Observable<any> {
    return this.httpClient
      .post<any>('http://localhost:5000/auth/login', userDto)
      .pipe(take(1));
  }

  getAllCategories(): Observable<ICategory[]> {
    return this.httpClient
      .get<ICategory[]>('http://localhost:5000/categories', {
        headers: this.getHeaders(),
      })
      .pipe(take(1));
  }

  createCategory(categoryDto: ICreateCategoryDto): Observable<ICategory> {
    return this.httpClient
      .post<ICategory>('http://localhost:5000/categories', categoryDto, {
        headers: this.getHeaders(),
      })
      .pipe(take(1));
  }

  deleteCategory(categoryId: ICategory['id']): Observable<ICategory> {
    return this.httpClient
      .delete<ICategory>(`http://localhost:5000/categories/${categoryId}`)
      .pipe(take(1));
  }

  createTodo(todo: ICreateTodoDto): Observable<ITodo> {
    return this.httpClient
      .post<ITodo>('http://localhost:5000/todos', todo)
      .pipe(take(1));
  }

  updateTodo(todoId: number, updateTodoDto: IUpdateTodoDto): Observable<ITodo> {
    console.log('asd API UPD', todoId, updateTodoDto);
    return this.httpClient
      .patch<ITodo>(
        `http://localhost:5000/todos/update/${todoId}`,
        updateTodoDto
      )
      .pipe(take(1));
  }

  deleteTodos(todoIds: string): Observable<ITodo[]> {
    return this.httpClient
      .delete<ITodo[]>(`http://localhost:5000/todos/${todoIds}`)
      .pipe(take(1));
  }
}
