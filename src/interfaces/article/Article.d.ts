import { IResponse } from "../response";


interface IPoster {
  _id: string;
  avatar: string;
  birthDay: string;
  email: string;
  gender: string;
  password: string;
  phone: string;
  userName: string;
}

interface IArticle {
  _id: string;
  content: string;
  createdAt: string;
  hot: boolean;
  keyword: string;
  poster: IPoster;
  posterId: string;
  posterName: string;
  shopId: string;
  slug: string;
  thumbnail: string;
  title: string;
}

export interface IArticleResponse {
  articles: IResponse<IArticle[]>;
}
