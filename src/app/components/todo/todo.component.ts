import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITodo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';
import { BaseComponent } from '../base-component/base.component';
import { BehaviorSubject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent extends BaseComponent {
  public todo$ = new BehaviorSubject<ITodo | null>(null);
  public completed$ = this.todo$.pipe(
    map((todo) => todo?.completed),
    takeUntil(this.destroy$)
  );

  @Input() public set todo(category: ITodo) {
    this.todo$.next(category);
  }

  constructor(private todosService: TodosService) {
    super(TodoComponent.name);
  }

  public deleteTodo() {
    const todoId = this.todo$.getValue()?.id;
    if (todoId) {
      this.todosService.deleteGQL(todoId);
    }
  }

  public completeTodo() {
    const todo = this.todo$.getValue();
    if (todo) {
      this.todosService.updateGQL(todo.id, { completed: !todo.completed });
    }
  }
}
