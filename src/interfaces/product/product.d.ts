import { ICategories } from "../categories/getCategories";
import { IReview } from "../rating/rating";
import { IResponse } from "../response";
import { Links } from "./productList";
interface IImage {
  _id: string;
  name: string;
  url: string;
  prodId:string;
  reviewId:string;
}


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

export interface IGetProductsData {
  recommendProduct: IResponse<IProduct[]>;
}

export interface IGetHotProductData {
  hotProducts: IResponse<IProduct[]>;
}

export interface GetLatestProductData {
  products:IResponse<IProduct[]>;
}

export interface GetRecommendProductData {
  recommendProduct:IResponse<IProduct[]>;
}
