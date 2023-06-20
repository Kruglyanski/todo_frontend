import * as Types from './global-types';

export type LoginMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;

export type LoginMutation = { login: Pick<Types.AuthResponse, 'token'> };

export type RegisterMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;

export type RegisterMutation = {
  registration: Pick<Types.AuthResponse, 'token'>;
};

export type CreateCategoryMutationVariables = Types.Exact<{
  title: Types.Scalars['String']['input'];
}>;

export type CreateCategoryMutation = {
  createCategory: Pick<Types.Category, 'id' | 'title'> & {
    todos: Array<
      Pick<
        Types.Todo,
        'completed' | 'description' | 'id' | 'tag' | 'title' | 'categoryId'
      >
    >;
  };
};

export type CreateTodoMutationVariables = Types.Exact<{
  categoryId: Types.Scalars['Float']['input'];
  title: Types.Scalars['String']['input'];
  description: Types.InputMaybe<Types.Scalars['String']['input']>;
  tag: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type CreateTodoMutation = {
  createTodo: Pick<
    Types.Todo,
    'completed' | 'description' | 'id' | 'tag' | 'title' | 'categoryId'
  >;
};

export type DeleteCategoryMutationVariables = Types.Exact<{
  categoryId: Types.Scalars['Float']['input'];
}>;

export type DeleteCategoryMutation = {
  deleteCategory: Pick<Types.Category, 'id' | 'title'>;
};

export type UpdateTodoMutationVariables = Types.Exact<{
  todoId: Types.Scalars['Float']['input'];
  updateTodoInput: Types.UpdateTodoInput;
}>;

export type UpdateTodoMutation = {
  updateTodo: Pick<
    Types.Todo,
    'completed' | 'description' | 'id' | 'tag' | 'title' | 'categoryId'
  >;
};

export type DeleteTodoMutationVariables = Types.Exact<{
  todoIds: Types.Scalars['String']['input'];
}>;

export type DeleteTodoMutation = {
  deleteTodo: Array<Pick<Types.Todo, 'id' | 'categoryId' | 'title'>>;
};
