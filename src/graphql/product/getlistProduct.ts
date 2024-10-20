import { gql } from "@apollo/client";

export const GET_PRODUCT_LIST = gql`
 query Products($pageIndex: Int, $pageSize: Int, $active: Boolean, $shopId: String, $orderBy: OrdByProdIpt, $slug: String, $prodName: String) {
  products(pageIndex: $pageIndex, pageSize: $pageSize, active: $active, shopId: $shopId, orderBy: $orderBy, slug: $slug, prodName: $prodName) {
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
      brandId
      cateId
      cost
      createdAt
      description
      hot
      isActive
      keyword
      linkBuyProductOne
      linkBuyProductThree
      linkBuyProductTwo
      name
      price
      quantity
      ratingCount
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
            linkBuyProductOne
            linkBuyProductTwo
            linkBuyProductThree
            createdAt
            isActive
            shopId
          }
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
          category {
            _id
            name
            isActive
            logo
            icon
            shopId
          }
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
            active
            prodId
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
        shopId
        createdAt
      }
      shopId
      slug
      image {
        _id
        name
        prodId
        reviewId
        url
      }
    }
  }
}
`;
