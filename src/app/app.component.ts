import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { ModalService } from './services/modal.service';
import { TodosService } from './services/todos.service';
import { EModalType } from './enums/modal-type';
import { ApiService } from './services/api.service';
import { BaseComponent } from './components/base-component/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends BaseComponent {
  public EModalType = EModalType;
  public filterValue: string = '';

  constructor(
    public categoriesService: CategoriesService,
    public modalService: ModalService,
    public todoService: TodosService,
    public apiService: ApiService
  ) {
    super(AppComponent.name);
  }

  public onFilterChanged(filterValue: string) {
    this.filterValue = filterValue;
  }
}
