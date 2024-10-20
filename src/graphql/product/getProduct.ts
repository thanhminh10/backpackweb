import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
query Product($prodId: ID, $slug: String) {
  product(prodId: $prodId, slug: $slug) {
    message
    success
    data {
      _id
      brandId
      brand {
        _id
        logo
        name
        isActive
        shopId
      }
      cateId
      category {
        _id
        icon
        isActive
        logo
        name
        shopId
      }
      cost
      createdAt
      description
      hot
      image {
        _id
        name
        prodId
        reviewId
        url
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
      slug
      review {
        _id
        active
        comment
        createdAt
        images {
          _id
          name
          prodId
          reviewId
          url
        }
        prodId
        rating
        shopId
        user {
          _id
          userName
          email
          phone
          userLevel
          avatar
          birthDay
          gender
          password
        }
      }
    }
  }
}
`;
