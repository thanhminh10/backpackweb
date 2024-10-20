import { gql } from "@apollo/client";

export const GET_CATEGORY_BY_ID = gql`
  query Category($cateId: ID!) {
    category(cateId: $cateId) {
      _id
      icon
      isActive
      logo
      name
    }
  }
`;
