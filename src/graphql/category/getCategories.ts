import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query Categories($pageSize: Int, $pageIndex: Int, $cateName: String, $active: Boolean, $shopId: String, $orderBy: OrdByCateIpt) {
  categories(pageSize: $pageSize, pageIndex: $pageIndex, cateName: $cateName, active: $active, shopId: $shopId, orderBy: $orderBy) {
    data {
      _id
      name
      isActive
      logo
      icon
      shopId
    }
    links {
      pageIndex
      pageSize
      totalItems
      totalPages
    }
    message
    success
  }
}
`;
