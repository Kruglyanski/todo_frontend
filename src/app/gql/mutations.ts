export const loginMutation = `
  mutation login($email: String!, $password: String!) {
    login(userInput: { email: $email, password: $password }) {
      token
    }
  }
`;

export const registerMutation = `
  mutation register($email: String!, $password: String!) {
    registration(userInput: { email: $email, password: $password }) {
      token
    }
  }
`;

export const createCategoryMutation = `
mutation createCategory($title: String!) {
    createCategory(categoryInput: {title: $title}) {
      id
      title
      todos {
        completed
        description
        id
        tag
        title
      }
    }
  }
`;

export const createTodoMutation = `
mutation createTodo($categoryId: Float!, $title: String!, $description: String, $tag: String, ) {
    createTodo(
      createTodo: {categoryId: $categoryId, description: $description, title: $title, tag: $tag}
    ) {
      category {
        id
        title
      }
      completed
      description
      id
      tag
      title
    }
  }
`;

export const deleteCategoryMutation = `
mutation deleteCategory( $categoryId: Float!) {
    deleteCategory(categoryId: $categoryId) {
        id
        title
      }
    }
`;

export const updateTodoMutation = `
mutation updateTodo( $todoId: Float = 2, $updateTodoInput: UpdateTodoInput = {completed: true}) {
    updateTodo(todoId: $todoId, updateTodoInput: $updateTodoInput) {
      completed
      description
      id
      tag
      title
      categoryId
    }
  }
`;

export const deleteTodosMutation = `
mutation MyMutation($todoIds: String!) {
    deleteTodo(todoIds: $todoIds) {
      id
      categoryId
    }
  }
`;
