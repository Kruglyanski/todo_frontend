import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { ModalService } from '../../services/modal.service';
import { ICreateTodoDto } from '../../models/dto/create-todo.dto';
import { CategoriesService } from '../../services/categories.service';
import { ETag } from '../../enums/tag';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent extends BaseComponent {
  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    categoryId: new FormControl<number | null>(
      this.categoriesService.categories$.getValue()[0]?.id
    ),
    tag: new FormControl<ETag>(ETag.LOW),
  });

  eTagArray = Object.values(ETag);

  constructor(
    private todosService: TodosService,
    private modalService: ModalService,
    public categoriesService: CategoriesService
  ) {
    super(CreateTodoComponent.name);
  }

  onSubmit() {
    this.todosService.create(this.form.value as ICreateTodoDto);
    this.modalService.hide();
  }

  get title() {
    return this.form.controls.title as FormControl;
  }
}
