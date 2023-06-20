import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { ModalService } from '../../services/modal.service';
import { CategoriesService } from '../../services/categories.service';
import { ETag } from '../../enums/tag';
import { BaseComponent } from '../base-component/base.component';
import { ICreateTodoDto } from '../../models/dto/create-todo.dto';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTodoComponent extends BaseComponent {
  public isSubmitClicked = false;

  public form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    categoryId: new FormControl<number | null>(
      this.categoriesService.categories$.value[0]?.id
    ),
    tag: new FormControl<ETag>(ETag.LOW),
  });

  public eTagArray = Object.values(ETag);

  constructor(
    private todosService: TodosService,
    private modalService: ModalService,
    public categoriesService: CategoriesService
  ) {
    super(CreateTodoComponent.name);
  }

  public onSubmit() {
    this.isSubmitClicked = true;
    if (this.form.valid) {
      this.todosService.createGQL(this.form.value as ICreateTodoDto);
      this.modalService.hide();
      this.isSubmitClicked = false;
    }
  }

  public get title() {
    return this.form.controls.title as FormControl;
  }
}
