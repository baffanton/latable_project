import { UserGenderTypes } from "@entities/User/model/types";

export type RegistrationFormStepTypes = "auth-info" | "code" | "user-info" | "success";

export interface RegistrationFormModel {
  authInfo: RegistrationFormAuthInfoStepModel;
  code: RegistrationCodeStepModel;
  userInfo: RegistrationFormUserInfoStepModel;
}

export interface RegistrationFormAuthInfoStepModel {
  email?: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationFormUserInfoStepModel {
  name: string;
  surname: string;
  age: number;
  gender: UserGenderTypes;
}

export enum RegistrationFormStepNames {
  authInfo = "authInfo",
  code = "code",
  userInfo = "userInfo",
}

export enum RegistrationFormAuthInfoStepNames {
  email = "email",
  phone = "phone",
  password = "password",
  confirmPassword = "confirmPassword",
}

export enum RegistrationFormUserInfoStepNames {
  name = "name",
  surname = "surname",
  age = "age",
  gender = "gender",
}

export interface RegistrationCodeStepModel {
  code: string;
}

export enum RegistrationCodeStepNames {
  code = "code",
}
