import { gql } from "@apollo/client";

export const CREATE_REVEIW =  gql `
mutation CreateReview($review: ReviewInput!, $prodId: String!, $shopId: String!, $files: [Upload!]) {
  createReview(review: $review, prodId: $prodId, shopId: $shopId, files: $files) {
    message
    success
    data {
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
        prodId
        reviewId
        url
      }
    }
  }
}
`