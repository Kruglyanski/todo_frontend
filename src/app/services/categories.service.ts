import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ICategory } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories: ICategory[] = [];
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ICategory[]> {
    return this.httpClient
      .get<ICategory[]>('http://localhost:5000/categories')
      .pipe(tap((categories) => (this.categories = categories)));
  }
}
