import { Component, Input } from '@angular/core';
import { ITodo } from '../../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo: ITodo;
}
