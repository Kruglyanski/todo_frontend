import { Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ModalService } from '../../services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICreateCategoryDto } from '../../models/dto/create-category.dto';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent extends BaseComponent {
  constructor(
    private categoriesService: CategoriesService,
    private modalService: ModalService
  ) {
    super(CreateCategoryComponent.name);
  }

  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
  });

  onSubmit() {
    this.categoriesService.createGQL(this.form.value as ICreateCategoryDto);
    this.modalService.hide();
  }

  get title() {
    return this.form.controls.title as FormControl;
  }
}
