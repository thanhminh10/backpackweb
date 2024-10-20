import { ICart, UserCartsResponse } from "@/interfaces/cart/cart";
import { IUser } from "@/interfaces/user/user";
import { makeVar } from "@apollo/client";

export const userCartVar = makeVar<ICart[]>([]);
export const userVar = makeVar<IUser | null>(null); // Thông tin người dùng
export const isLoggedInVar = makeVar(false); // Trạng thái đăng nhập
// Assuming this is your makeVar for the order confirmation

interface OrderConfirmationData {
  subTotal: number | null;
  paymentMethod: number | null;
  deliveryAddress: string | null;
  userName: string | null;
  userPhone: string | null;
  address :{
    province: string | null,
    district: string | null,
    ward: string | null,
    detailedAddress: string | null,
  },
  prods: {
    prodName: string | null;
    itemQuantity: number | null;
    price: number | null;
    prodId: string | null;
    thumbnail: string | null;
  }[];
}

export const orderConfirmationVar = makeVar<OrderConfirmationData>({
  subTotal: null,
  paymentMethod: null,
  deliveryAddress: null,
  userName: null,
  userPhone: null,
  address: {
    province: "",
    district: "",
    ward: "",
    detailedAddress: "",
  },
  prods: [
    {
      price: null,
      prodName: null,
      itemQuantity: null,
      prodId: null,
      thumbnail: null,
    },
  ],
});



