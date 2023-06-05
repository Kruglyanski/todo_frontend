import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ITodo[]> {
    return this.httpClient.get<ITodo[]>('http://localhost:5000/todos');
  }
}
