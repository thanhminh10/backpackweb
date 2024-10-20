// lib/fetchUserInfo.ts

import { SHOP_ID } from "@/constants/enviroment";
import { GET_CART_LIST } from "@/graphql/cart/cart";
import { GET_USER_INFO } from "@/graphql/user/userinfo";
import client from "@/lib/apolloClient";

// Hàm fetchUserInfo để lấy thông tin người dùng
export const fetchUserInfo = async () => {
  try {
    const { data } = await client.query({
      query: GET_USER_INFO,
      fetchPolicy: "network-only",
    });
    if (data.userAccount.success) {
      return data.userAccount.data; // Trả về dữ liệu người dùng
    } else {
      throw new Error(data.userAccount.message);
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    throw error;
  }
};

export const fetchUserCart = async () => {
  try {
    const { data } = await client.query({
      query: GET_CART_LIST,
      variables:{
        shopId: SHOP_ID,
      },
      fetchPolicy: "network-only",
    });
    if (data?.userCarts?.success) {
      return data?.userCarts?.data;
    } else {
      throw new Error(data.userCarts.message);
    }
  } catch (error) {
    console.error("Error fetching user cart:", error);
    throw error;
  }
};
