


import { IResponse } from "@/interfaces/response";

export interface IFormRegister {
    userName?: string;
    email: string | null;
    password: string | null;
    phone: string | null;
}


export interface IRegisterResponse {
  register: IResponse<IToken>;
}

interface IToken {
  token: string;
}

