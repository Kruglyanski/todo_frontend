export const categoriesQuery = `
query categoriesQuery {
  categories {
    todos {
      completed
      description
      id
      tag
      title
      category{
        id
        title
      }
      categoryId
    }
    title
    id
  }
}
`;
