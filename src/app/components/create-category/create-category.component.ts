import { Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ModalService } from '../../services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateCategoryDto } from '../../models/dto/create-category-dto';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent {
  constructor(
    private categoriesService: CategoriesService,
    private modalService: ModalService
  ) {}

  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
  });

  onSubmit() {
    this.categoriesService
      .create(this.form.value as CreateCategoryDto)
      .subscribe(() => {
        this.modalService.hide();
        console.log('Created category!', this.form.value);
      });
  }

  get title() {
    return this.form.controls.title as FormControl;
  }
}
