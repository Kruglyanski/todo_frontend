import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../models/category';

//НИГДЕ НЕ ЮЗАЕТСЯ

@Pipe({
  name: 'filterTodos',
})
export class FilterTodosPipe implements PipeTransform {
  transform(categories: ICategory[], value: string): ICategory[] {
    if (!value) {
      return categories;
    }

    return categories.reduce<ICategory[]>((acc, cat) => {
      const filteredTodos = cat.todos.filter((todo) =>
        todo.title.toLowerCase().includes(value.toLowerCase())
      );

      acc.push({ ...cat, todos: filteredTodos });
      return acc;
    }, []);
  }
}
