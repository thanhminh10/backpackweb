export interface IProductsList {
  data: any;
  links: ILinks;
  _id: string;
  name: string;
  price: number;
  quantitySold: number;
  description: string;
  slug: string;
  image: Img;
  hot: boolean;
  brand: {
    name: string;
  };
  products: any;
  recommendProduct: any;
}

export interface ILinks {
  totalPage: number;
  totalItems: number;
  pageIndex: number;
  pageSize: number;
}
