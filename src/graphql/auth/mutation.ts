import { gql } from "@apollo/client";

export const MUTATION_LOGIN = gql(`
    mutation LoginShop($userLogin: Login!, $shopId: String!) {
  loginShop(userLogin: $userLogin, shopId: $shopId) {
    data {
      token
    }
    message
    success
  }
}
`);

export const MUTATION_REGISTER =  gql(`
    mutation Register($shopId: String, $avatar: Upload, $userRegister: UserRegister) {
  register(shopId: $shopId, avatar: $avatar, userRegister: $userRegister) {
    message
    success
    data {
      token
    }
  }
}`)
