import { Component, Input } from '@angular/core';
import { ITodo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo: ITodo;
  constructor(private todosService: TodosService) {}

  deleteTodo() {
    this.todosService.delete(this.todo).subscribe();
  }
}
