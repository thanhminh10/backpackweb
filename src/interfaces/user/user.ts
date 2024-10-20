export interface IUser {
    userName: string;
    email: string;
    phone: string;
    userLevel: string;
    avatar: string;
    birthDay: string; // or 'Date' if it's a JavaScript Date object
    gender: string;
  }
  
  export interface IUserResponse {
    userAccount: {
      success: boolean;
      message: string;
      data: IUser; // Referencing the IUser interface
    };
  }
  