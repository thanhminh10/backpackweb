import { gql } from "@apollo/client";
export const GET_ARTICLE = gql`
  query Article($slug: String, $articleId: String) {
  article(slug: $slug, articleId: $articleId) {
    message
    success
    data {
      _id
      content
      createdAt
      hot
      keyword
      poster {
        _id
        avatar
        birthDay
        email
        gender
        password
        phone
        userName
      }
      posterId
      posterName
      shopId
      slug
      thumbnail
      title
    }
  }
}
`;
