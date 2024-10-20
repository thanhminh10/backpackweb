import { IProduct } from "../product/product";
import { IReview } from "../rating/rating";
import { IResponse } from "../response";
import { IUser } from "../user/user";

export interface ICart {
  _id: string;
  amount: number;
  createdAt: string;
  prodId: string;
  product: IProduct;
  quantity: number;
  review?: IReview[];
  shopId: string;
  userId: string;
  user: IUser;
}

export interface UserCartsResponse {
  userCarts: IResponse<ICart[]>;
}
