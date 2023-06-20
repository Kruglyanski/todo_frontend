import gql from 'graphql-tag';

export const categoriesQuery = gql`
  query categories {
    categories {
      todos {
        completed
        description
        id
        tag
        title
        categoryId
      }
      title
      id
    }
  }
`;
// category {
//           id
//           title
//         }
