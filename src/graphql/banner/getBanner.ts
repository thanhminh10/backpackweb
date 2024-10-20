import { gql } from "@apollo/client";

export const GetBannersGQL = gql`
  query Banners($bannerTitle: String, $active: Boolean, $shopId: String, $orderBy: OrdByBannerIpt) {
  banners(bannerTitle: $bannerTitle, active: $active, shopId: $shopId, orderBy: $orderBy) {
    _id
    title
    url
    imageUrl
    isActive
    cateId
    category {
      _id
      name
      isActive
      logo
      icon
      shopId
      products {
        _id
        name
        sku
        slug
        price
        cost
        quantity
        hot
        description
        ratingCount
        keyword
        cateId
        brandId
        image {
          _id
          name
          url
          prodId
          reviewId
        }
        linkBuyProductOne
        linkBuyProductTwo
        linkBuyProductThree
        createdAt
        brand {
          _id
          name
          logo
          isActive
          shopId
        }
        review {
          _id
          comment
          rating
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
          active
          images {
            _id
            name
            url
            prodId
            reviewId
          }
          prodId
          product {
            _id
            name
            sku
            slug
            price
            cost
            quantity
            hot
            description
            ratingCount
            keyword
            cateId
            brandId
            linkBuyProductOne
            linkBuyProductTwo
            linkBuyProductThree
            createdAt
            isActive
            shopId
          }
          shopId
          createdAt
        }
        generalReview {
          count
          ratingCount
        }
        inventory {
          _id
          available
          onHand
          trading
          inComing
          sold
          productId
          shopId
        }
        isActive
        shopId
      }
    }
    shopId
  }
}
`;
