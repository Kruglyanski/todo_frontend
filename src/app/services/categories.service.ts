import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICategory } from '../models/category';
import { ICreateCategoryDto } from '../models/dto/create-category.dto';
import { ApiService } from './api.service';
import { WebsocketService } from './websocket.service';
import { EMessageType } from '../enums/message-type';
import {
  CategoriesQuery,
  CategoriesQueryVariables,
} from '../gql/queries-generated-types';
import { categoriesQuery } from '../gql/queries';
import {
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables,
} from '../gql/mutations-generated-types';
import {
  createCategoryMutation,
  deleteCategoryMutation,
} from '../gql/mutations';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public categories$ = new BehaviorSubject<ICategory[]>([]);

  constructor(private apiService: ApiService, private wss: WebsocketService) {}

  //GraphQL:

  public getAllGQL() {
    return this.apiService
      .gqlRequest<CategoriesQuery, CategoriesQueryVariables>(categoriesQuery)
      .subscribe(({ categories }) => {
        return this.categories$.next(categories);
      });
  }

  public createGQL(categoryDto: ICreateCategoryDto): Subscription {
    return this.apiService
      .gqlRequest<CreateCategoryMutation, CreateCategoryMutationVariables>(
        createCategoryMutation,
        categoryDto
      )
      .subscribe((resp) => {
        const category = resp.createCategory;
        const updatedCategories = [...this.categories$.getValue(), category];

        this.categories$.next(updatedCategories);

        this.wss.emit('chatMessage', {
          type: EMessageType.CREATE_CATEGORY,
          entityTitle: [category.title],
        });
      });
  }

  public deleteGQL(categoryId: ICategory['id']): Subscription {
    return this.apiService
      .gqlRequest<DeleteCategoryMutation, DeleteCategoryMutationVariables>(
        deleteCategoryMutation,
        { categoryId }
      )
      .subscribe((data) => {
        const category = data.deleteCategory;
        const updatedCategories = this.categories$
          .getValue()
          .filter((cat) => cat.id !== category.id);

        this.categories$.next(updatedCategories);

        this.wss.emit('chatMessage', {
          type: EMessageType.DELETE_CATEGORY,
          entityTitle: [category.title],
        });
      });
  }

  //REST:

  // public getAll(): any {
  //   return this.apiService
  //     .getAllCategories()
  //     .pipe(take(1))
  //     .subscribe((categories) => {
  //       this.categories$.next(categories);
  //     });
  // }

  // public create(categoryDto: ICreateCategoryDto): any {
  //   return this.apiService
  //     .createCategory(categoryDto)
  //     .pipe(take(1))
  //     .subscribe((category) => {
  //       const updatedCategories = [...this.categories$.getValue(), category];
  //       this.categories$.next(updatedCategories);
  //     });
  // }

  // public delete(categoryId: ICategory['id']): Subscription {
  //   return this.apiService
  //     .deleteCategory(categoryId)
  //     .pipe(take(1))
  //     .subscribe((category) => {
  //       const updatedCategories = this.categories$
  //         .getValue()
  //         .filter((cat) => cat.id !== category.id);
  //       this.categories$.next(updatedCategories);
  //     });
  // }
}
