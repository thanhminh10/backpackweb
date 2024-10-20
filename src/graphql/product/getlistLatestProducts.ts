import { gql } from "@apollo/client";

export const GET_LATEST_PRODUCTS = gql`
  query LatestProducts($pageIndex: Int, $pageSize: Int, $sort: Int) {
    products(pageIndex: $pageIndex, pageSize: $pageSize, sort: $sort) {
      links {
        totalItems
      }
      data {
        _id
        slug
        name
        price
        quantitySold
        description
        cateId
        image {
          name
          url
        }
      }
    }
  }
`;
