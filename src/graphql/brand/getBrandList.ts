import { gql } from "@apollo/client";

export const GET_BRAND_LIST = gql`
  query Brand($brandId: ID!) {
    brand(brandId: $brandId) {
      _id
      isActive
      name
      products {
        _id
        name
        price
        quantity
        quantitySold
        slug
        image {
          _id
          name
          url
          prodId
        }
        hot
      }
    }
  }
`;
