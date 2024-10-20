import { gql } from "@apollo/client";

export const GET_CART_LIST = gql`
 query UserCarts($shopId: String!, $pageSize: Int) {
  userCarts(shopId: $shopId, pageSize: $pageSize) {
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
      amount
      createdAt
      prodId
      product {
        _id
        brandId
        cateId
        cost
        createdAt
        hot
        image {
          name
          _id
          prodId
          reviewId
          url
        }
        name
        price
        quantity
        ratingCount
        shopId
        slug
        isActive
        keyword
        linkBuyProductTwo
        linkBuyProductThree
        linkBuyProductOne
      }
      quantity
      review {
        _id
        active
        comment
        createdAt
        prodId
        rating
        shopId
        user {
          _id
          avatar
          birthDay
          phone
          userName
          userLevel
          email
        }
      }
      shopId
      userId
    }
  }
}
`;

export const  CREATE_CART =  gql `
 mutation CreateCart($prodId: String!, $quantity: Int!, $shopId: String) {
  createCart(prodId: $prodId, quantity: $quantity, shopId: $shopId) {
    data {
      amount
      _id
      createdAt
      prodId
      quantity
      shopId
      userId
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
      product {
        _id
        cateId
        brandId
        brand {
          _id
          isActive
          logo
          name
          shopId
        }
        cost
        createdAt
        generalReview {
          count
          ratingCount
        }
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
        slug
        review {
          _id
          active
          comment
          createdAt
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
          images {
            _id
            name
            url
            prodId
            reviewId  
          }
        }
      }
    }
    message
    success
  }
}
`

export const UPDATE_CART = gql`
  mutation UpdateCart($prodId: String!, $quantity: Int!) {
  updateCart(prodId: $prodId, quantity: $quantity) {
    message
    success
    data {
      _id
      amount
      createdAt
      prodId
     product {
        _id
        brandId
        cateId
        cost
        createdAt
        hot
        image {
          name
          _id
          prodId
          reviewId
          url
        }
        name
        price
        quantity
        ratingCount
        shopId
        slug
        isActive
        keyword
        linkBuyProductTwo
        linkBuyProductThree
        linkBuyProductOne
      }
    }
  }
}
`;

export const MUTIPLE_DELETE_CART = gql`
  mutation MultipleDeleteCart($cartIds: [ID!]) {
  multipleDeleteCart(cartIds: $cartIds) {
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
