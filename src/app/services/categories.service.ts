import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ICategory } from '../models/category';
import { CreateCategoryDto } from '../models/dto/create-category-dto';

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

  create(categoryDto: CreateCategoryDto): Observable<ICategory> {
    return this.httpClient
      .post<ICategory>('http://localhost:5000/categories', {
        ...categoryDto,
        userId: 5,
      })
      .pipe(
        tap((category) => {
          this.categories = [...this.categories, { ...category, todos: [] }]; //??????????
        })
      );
  }

  delete(category: ICategory): Observable<ICategory> {
    return this.httpClient
      .delete<ICategory>(`http://localhost:5000/categories/${category.id}`)
      .pipe(
        tap(() => {
          this.categories = this.categories.filter(
            (cat) => cat.id !== category.id
          );
        })
      );
  }
}
