import { IImg } from "./latestProducts";

export interface IRecommendProducts {
  _id: string;
  name: string;
  price: number;
  quantitySold: number;
  description: string;
  cateId: any;
  image: IImg;
}
