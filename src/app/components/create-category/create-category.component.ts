import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ModalService } from '../../services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICreateCategoryDto } from '../../models/dto/create-category.dto';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCategoryComponent extends BaseComponent {
  public isSubmitClicked = false;

  constructor(
    private categoriesService: CategoriesService,
    private modalService: ModalService
  ) {
    super(CreateCategoryComponent.name);
  }

  public form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
  });

  public onSubmit() {
    this.isSubmitClicked = true;
    if (this.form.valid) {
      this.categoriesService.createGQL(this.form.value as ICreateCategoryDto);
      this.modalService.hide();
      this.isSubmitClicked = false;
    }
  }

  public get title() {
    return this.form.controls.title as FormControl;
  }
}
