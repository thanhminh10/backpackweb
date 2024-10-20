import { IResponse } from "../response";

// Interface for individual Category
export interface ICategory {
  _id: string;
  name: string;
  isActive: boolean;
  logo: string;
  icon: string;
  shopId: string;
}

// Interface for pagination links
export interface ILinks {
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
export interface ICategoryResponse {
  categories: IResponse<ICategory[]>;
}

