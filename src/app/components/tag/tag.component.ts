import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITodo } from '../../models/todo';
import { ETag } from '../../enums/tag';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent extends BaseComponent {
  @Input() public tag: ITodo['tag'];

  public ETag = ETag;

  constructor() {
    super(TagComponent.name);
  }
}
