import { gql } from "@apollo/client";

export const GET_SEARCH = gql`
  query SearchList($sort: Int, $slug: String, $pageIndex: Int, $pageSize: Int) {
    products(
      sort: $sort
      slug: $slug
      pageIndex: $pageIndex
      pageSize: $pageSize
    ) {
      links {
        totalItems
      }
      data {
        _id
        name
        slug
        price
        quantitySold
        hot
        image {
          name
          url
        }
      }
    }
  }
`;
