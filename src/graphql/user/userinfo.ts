import { gql } from "@apollo/client";

export const GET_USER_INFO = gql(`
    query UserAccount {
  userAccount {
    message
    success
    data {
      _id
      userName
      email
      phone
      userLevel
      avatar
      birthDay
      gender
    }
  }
}
`);

