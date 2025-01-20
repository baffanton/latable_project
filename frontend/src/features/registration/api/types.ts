import { UserGenderTypes, UserModel } from "@entities/User/model/types";

export interface RegistrationAuthInfoStepRequestModel {
  email: string;
  password: string;
}

export interface RegistrationAuthInfoStepResponseModel {
  id: string;
}

export interface RegistrationCodeStepRequestModel {
  id: string;
  code: string;
}

export interface RegistrationSendCodeAgainRequestModel {
  id: string;
}

export interface RegistrationUserInfoStepRequestModel {
  id: string;
  name: string;
  surname: string;
  age: number;
  gender: UserGenderTypes;
}

export interface RegistrationUserInfoStepResponseModel {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
}
