import { gql } from "@apollo/client";

export const GET_BRANDS = gql`
  query Brands($pageSize: Int, $pageIndex: Int, $brandName: String, $active: Boolean, $shopId: String) {
  brands(pageSize: $pageSize, pageIndex: $pageIndex, brandName: $brandName, active: $active, shopId: $shopId) {
    data {
      _id
      isActive
      logo
      name
      shopId
    }
    links {
      totalPages
      totalItems
      pageIndex
      pageSize
    }
    message
    success
  }
}
`;
