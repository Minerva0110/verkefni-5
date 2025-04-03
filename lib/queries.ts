import { gql } from "graphql-request";


export const GET_FORSIDA = gql`
  {
    allHomepages(first: 1) {
      title
      content {
        value
      }
    }
  }
`;


export const GET_ALL_FRETTIR = gql`
  {
    allNews(orderBy: date_DESC) {
      id
      title
      slug
      description
      hofundur
      date
      image {
        url
        alt
      }
    }
  }
`;

export const GET_SINGLE_FRETT = gql`
  query GetSingleFrett($slug: String) {
    news(filter: {slug: {eq: $slug}}) {
      id
      title
      content {
        value
      }
      hofundur
      date
      image {
        url
        alt
      }
    }
  }
`;

