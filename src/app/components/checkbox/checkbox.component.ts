import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { ITodo } from '../../models/todo';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends BaseComponent implements OnInit {
  @Input() todo: ITodo;
  checkboxForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private todosService: TodosService
  ) {
    super(CheckboxComponent.name);
  }

  ngOnInit() {
    this.checkboxForm = this.formBuilder.group({
      isChecked: [false],
    });

    this.checkboxForm
      .get('isChecked')
      ?.valueChanges.subscribe((isChecked: boolean) => {
        console.log('Checkbox value:', isChecked);
        console.log('todo:', this.todo);
        if (isChecked) {
          this.todosService.selectTodo(this.todo);
        } else {
          this.todosService.unSelectTodo(this.todo);
        }
      });
  }
}
