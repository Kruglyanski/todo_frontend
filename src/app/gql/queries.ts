import gql from "graphql-tag";

export const categoriesQuery = gql`
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
