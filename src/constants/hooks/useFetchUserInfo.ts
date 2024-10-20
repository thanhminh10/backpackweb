import { fetchUserCart, fetchUserInfo } from "@/lib/fetchUserInfo";
import { isLoggedInVar, userCartVar, userVar } from "@/constants/makevar/makeVar";
import { useEffect } from "react";

export const useFetchUserInfo = () => {
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await fetchUserInfo();
        const userCard = await fetchUserCart();
        userVar(userInfo);
        userCartVar(userCard)
        isLoggedInVar(true);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        isLoggedInVar(false);
      }
    };
    const token = localStorage.getItem("token");
    if (token) {
      getUserInfo();
    }
  }, []);
};
