import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { ICategory } from '../models/category';
import { ICreateCategoryDto } from '../models/dto/create-category.dto';
import { ApiService } from '../api.service';
import { ModalService } from './modal.service';
import { ICategoriesQuery } from '../models/queries';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories$ = new BehaviorSubject<ICategory[]>([]);

  constructor(
    private modalService: ModalService,
    private apiService: ApiService
  ) {}

  //GraphQL:

  getAllGQL(): Subscription {
    return this.apiService
      .getAllCategoriesGQL()
      .pipe(take(1))
      .subscribe((data: ICategoriesQuery) => {
        this.categories$.next(data.data.categories);
      });
  }

  createGQL(categoryDto: ICreateCategoryDto): Subscription {
    return this.apiService
      .createCategoryGQL(categoryDto)
      .pipe(take(1))
      .subscribe((resp) => {
        const updatedCategories = [
          ...this.categories$.getValue(),
          resp.data.createCategory,
        ];
        this.categories$.next(updatedCategories);
        this.modalService.hide();
      });
  }

  deleteGQL(categoryId: ICategory['id']): Subscription {
    return this.apiService
      .deleteCategoryGQL(categoryId)
      .pipe(take(1))
      .subscribe((resp) => {
        const category = resp.data.deleteCategory;
        const updatedCategories = this.categories$
          .getValue()
          .filter((cat) => cat.id !== category.id);
        this.categories$.next(updatedCategories);
        this.modalService.hide();
      });
  }

  //REST:

  getAll(): Subscription {
    return this.apiService
      .getAllCategories()
      .pipe(take(1))
      .subscribe((categories) => {
        this.categories$.next(categories);
      });
  }

  create(categoryDto: ICreateCategoryDto): Subscription {
    return this.apiService
      .createCategory(categoryDto)
      .pipe(take(1))
      .subscribe((category) => {
        const updatedCategories = [...this.categories$.getValue(), category];
        this.categories$.next(updatedCategories);
        this.modalService.hide();
      });
  }

  delete(categoryId: ICategory['id']): Subscription {
    return this.apiService
      .deleteCategory(categoryId)
      .pipe(take(1))
      .subscribe((category) => {
        const updatedCategories = this.categories$
          .getValue()
          .filter((cat) => cat.id !== category.id);
        this.categories$.next(updatedCategories);
        this.modalService.hide();
      });
  }
}
