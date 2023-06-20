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
import { ModalComponent } from './components/modal/modal.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { SignComponent } from './components/sign/sign.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { AuthComponent } from './components/auth/auth.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TagComponent,
    CheckboxComponent,
    CategoryComponent,
    FilterTodosPipe,
    ModalComponent,
    CreateTodoComponent,
    CreateCategoryComponent,
    SignComponent,
    HeaderComponent,
    ModalContentComponent,
    CategoriesListComponent,
    AuthComponent,
    ChatComponent,
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
