import { gql } from '@apollo/client'

export const GET_COUNTRY = gql`
  query Country($code: ID!) {
    country(code:$code) {
      name
      code
      currency
      emoji
      languages {
        name
      }
    }
  }
`;

export const GET_CONTINENT = gql`
query Continent($continent: ID!) {
  continent(code:$continent) {
    countries {
      emoji
      name
    }
    }
  }
`;