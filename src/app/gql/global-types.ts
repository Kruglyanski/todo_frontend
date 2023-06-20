/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
}

export interface AuthResponse {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
}

export interface Category {
  __typename?: 'Category';
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  todos: Array<Todo>;
}

export interface CreateCategoryInput {
  title: Scalars['String']['input'];
}

export interface CreateTodoInput {
  categoryId: Scalars['Float']['input'];
  description: InputMaybe<Scalars['String']['input']>;
  tag: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
}

export interface CreateUserInput {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}

export interface Mutation {
  __typename?: 'Mutation';
  createCategory: Category;
  createTodo: Todo;
  deleteCategory: Category;
  deleteTodo: Array<Todo>;
  login: AuthResponse;
  registration: AuthResponse;
  updateTodo: Todo;
}


export interface MutationCreateCategoryArgs {
  categoryInput: CreateCategoryInput;
}


export interface MutationCreateTodoArgs {
  createTodo: CreateTodoInput;
}


export interface MutationDeleteCategoryArgs {
  categoryId: Scalars['Float']['input'];
}


export interface MutationDeleteTodoArgs {
  todoIds: Scalars['String']['input'];
}


export interface MutationLoginArgs {
  userInput: CreateUserInput;
}


export interface MutationRegistrationArgs {
  userInput: CreateUserInput;
}


export interface MutationUpdateTodoArgs {
  todoId: Scalars['Float']['input'];
  updateTodoInput: UpdateTodoInput;
}

export interface Query {
  __typename?: 'Query';
  categories: Array<Category>;
  todos: Array<Todo>;
}

export interface Todo {
  __typename?: 'Todo';
  category: Category;
  categoryId: Maybe<Scalars['Float']['output']>;
  completed: Maybe<Scalars['Boolean']['output']>;
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  tag: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
}

export interface UpdateTodoInput {
  completed: Scalars['Boolean']['input'];
}
