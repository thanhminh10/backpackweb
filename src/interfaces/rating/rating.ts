interface IReviewImage {
  _id: string;
  name: string;
  prodId: string;
}

interface IUser {
  _id: string;
  avatar: string;
  email: string;
  birthDay: string;
  gender: string;
  phone: string;
  userLevel: string;
  userName: string;
}

export interface IReview {
  _id: string;
  active: boolean;
  comment: string;
  createdAt: string;
  images: IReviewImage[];
  prodId: string;
  rating: number;
  user: IUser;
}

