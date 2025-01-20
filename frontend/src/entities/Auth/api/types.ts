import { UserModel } from "@entities/User/model/types";

export interface RefreshResponseModel {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
}
