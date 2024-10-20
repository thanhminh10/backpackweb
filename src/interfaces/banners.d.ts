import { IResponse } from "./response";

// Interface for Banner
export interface IBanner {
  _id: string;
  title: string;
  url: string;
  imageUrl: string;
  isActive: boolean;
  cateId: string;
  shopId: string;
}

// Interface for the query result
export interface IBannerResponse {
  banners: IResponse<IBanner[]>;
}
