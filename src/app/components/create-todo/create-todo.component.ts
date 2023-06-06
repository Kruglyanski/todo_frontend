import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { ModalService } from '../../services/modal.service';
import { CreateTodoDto } from '../../models/dto/create-todo-dto';
import { CategoriesService } from '../../services/categories.service';
import { ETag } from '../../enums/tag';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    categoryId: new FormControl<number>(
      this.categoriesService.categories[0]?.id
    ),
    tag: new FormControl<ETag>(ETag.LOW),
  });

  eTagArray = Object.values(ETag);

  constructor(
    private todosService: TodosService,
    private modalService: ModalService,
    public categoriesService: CategoriesService
  ) {}

  onSubmit() {
    this.todosService.create(this.form.value as CreateTodoDto).subscribe(() => {
      this.modalService.hide();
      console.log('Created todo!', this.form.value);
    });
  }

  get title() {
    return this.form.controls.title as FormControl;
  }
}
