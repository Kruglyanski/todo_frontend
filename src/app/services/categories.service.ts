import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { ICategory } from '../models/category';
import { ICreateCategoryDto } from '../models/dto/create-category.dto';
import { ApiService } from '../api.service';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories$ = new BehaviorSubject<ICategory[]>([]);

  constructor(
    private modalService: ModalService,
    private apiService: ApiService
  ) {}

  getAll(): Subscription {
    return this.apiService
      .getAllCategories()
      .pipe(take(1))
      .subscribe((categories) => this.categories$.next(categories));
  }

  create(categoryDto: ICreateCategoryDto): Subscription {
    return this.apiService
      .createCategory(categoryDto)
      .pipe()
      .subscribe((category) => {
        const updatedCategories = [...this.categories$.getValue(), category];
        this.categories$.next(updatedCategories);
        this.modalService.hide();
      });
  }

  delete(categoryId: ICategory['id']): Subscription {
    return this.apiService
      .deleteCategory(categoryId)
      .pipe()
      .subscribe((category) => {
        const updatedCategories = this.categories$
          .getValue()
          .filter((cat) => cat.id !== category.id);
        this.categories$.next(updatedCategories);
        this.modalService.hide();
      });
  }
}
