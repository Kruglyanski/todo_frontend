import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { TagComponent } from './components/tag/tag.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './components/category/category.component';
import { FilterTodosPipe } from './pipes/filter-todos.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TagComponent,
    CheckboxComponent,
    CategoryComponent,
    FilterTodosPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
