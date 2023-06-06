import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { ModalService } from '../../services/modal.service';
import { CreateTodoDto } from '../../models/create-todo-dto';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  constructor(
    private todosService: TodosService,
    private modalService: ModalService
  ) {}
  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
  });

  onSubmit() {
    this.todosService
      .create({ ...this.form.value, categoryId: 6 } as CreateTodoDto)
      .subscribe(() => {
        this.modalService.hide();
        console.log('Created todo!', this.form.value);
      });
  }

  get title() {
    return this.form.controls.title as FormControl;
  }
}
