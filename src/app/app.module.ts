import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { TagComponent } from './components/tag/tag.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './components/category/category.component';
import { FilterTodosPipe } from './pipes/filter-todos.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
//import { TokenInterceptor } from './services/token.interceptor';

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
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
