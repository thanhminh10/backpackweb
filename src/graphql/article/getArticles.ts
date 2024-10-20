import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
  query Articles($pageIndex: Int!, $pageSize: Int!, $shopId: String, $orderBy: OrdByArtInput) {
  articles(pageIndex: $pageIndex, pageSize: $pageSize, shopId: $shopId, orderBy: $orderBy) {
    links {
      pageIndex
      pageSize
      totalItems
      totalPages
    }
    message
    success
    data {
      content
      createdAt
      hot
      _id
      keyword
      poster {
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
