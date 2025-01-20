import { UserModel } from "@entities/User/model/types";

export interface LoginRequestModel {
  email: string;
  password: string;
}

export interface LoginResponseModel {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
}
