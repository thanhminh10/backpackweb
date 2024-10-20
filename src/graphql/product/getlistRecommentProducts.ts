import { gql } from "@apollo/client";

export const GET_RECOMMEND_LIST = gql`
  query RecommendProduct($cateId: String, $pageSize: Int, $pageIndex: Int, $sort: Int, $active: Boolean, $shopId: String) {
  recommendProduct(cateId: $cateId, pageSize: $pageSize, pageIndex: $pageIndex, sort: $sort, active: $active, shopId: $shopId) {
    links {
      totalPages
      totalItems
      pageIndex
      pageSize
    }
    message
    success
    data {
      _id
      brand {
        name
      }
      brandId
      cateId
      cost
      createdAt
      description
      hot
      image {
        _id
        name
        url
        prodId
        reviewId
      }
      isActive
      keyword
      linkBuyProductOne
      linkBuyProductThree
      linkBuyProductTwo
      name
      price
      quantity
      ratingCount
      shopId
      review {
        _id
        comment
        prodId
        rating
      }
      slug
    }
  }
}
`;
