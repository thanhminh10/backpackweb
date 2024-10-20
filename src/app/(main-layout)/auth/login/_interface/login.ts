import { IResponse } from "@/interfaces/response";

export interface ILoginResponse {
  loginShop: IResponse<IToken>;
}

interface IToken {
  token: string;
}
