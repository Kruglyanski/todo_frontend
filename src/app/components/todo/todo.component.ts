import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITodo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';
import { BaseComponent } from '../base-component/base.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent extends BaseComponent {
  //@Input() todo: ITodo;

  todo$ = new BehaviorSubject<ITodo | null>(null);
  // @Input() category: ICategory;
  @Input() set todo(category: ITodo) {
    console.log('asd Input todo');
    this.todo$.next(category);
  }

  constructor(private todosService: TodosService) {
    super(TodoComponent.name);
  }

  deleteTodo() {
    const todo = this.todo$.getValue();
    todo && this.todosService.delete(todo);
  }

  completeTodo() {
    const todo = this.todo$.getValue();
    todo && this.todosService.update(todo.id, { completed: !todo.completed });
  }
}
