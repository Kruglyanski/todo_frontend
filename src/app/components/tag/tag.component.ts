import { Component, Input } from '@angular/core';
import { ITodo } from '../../models/todo';
import { ETag } from '../../enums/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  @Input() tag: ITodo['tag'];

  ETag: typeof ETag = ETag;

  constructor() {}
}
