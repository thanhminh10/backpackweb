import { IBrand } from "../brand/brand";
import { ICategories, ICategory } from "../categories/getCategories";
import { IReview } from "../rating/rating";
import { IImage } from "./product";
export interface IProduct {
  _id: string;
  brandId: string;
  brand: IBrand;
  cateId: string;
  category: ICategory;
  cost: number;
  createdAt: string;
  description: string;
  hot: boolean;
  image: IImage[];
  isActive: boolean;
  keyword: string;
  linkBuyProductOne?: string;
  linkBuyProductTwo?: string;
  linkBuyProductThree?: string;
  name: string;
  price: number;
  quantity: number;
  ratingCount: string;
  shopId: string;
  slug: string;
  review?: IReview[];
}

export interface IProductDetailData {
  product: IResponse<IProduct>;
}
