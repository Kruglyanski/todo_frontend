import { ICategory } from './category';
import { ITodo } from './todo';

export interface ICategoriesQuery {
  data: {
    categories: ICategory[];
  };
}

export interface ILoginQuery {
  data: {
    login: { token: string };
  };
}

export interface IRegisterQuery {
  data: {
    registration: { token: string };
  };
}

export interface ICreateCategoryQuery {
  data: {
    createCategory: ICategory;
  };
}

export interface ICreateTodoQuery {
  data: {
    createTodo: ITodo;
  };
}

export interface IDeleteCategoryQuery {
  data: {
    deleteCategory: {
      id: number;
      title: string;
    };
  };
}

export interface IUpdateTodoQuery {
  data: {
    updateTodo: ITodo;
  };
}

export interface IDeleteTodoQuery {
  data: {
    deleteTodo: Pick<ITodo, 'id' | 'categoryId'>[];
  };
}
