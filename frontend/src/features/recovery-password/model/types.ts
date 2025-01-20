export type RecoveryPasswordFormStepTypes = "auth-info" | "code" | "change-password" | "success";

export interface RecoveryPasswordFormModel {
  authInfo: RecoveryPasswordFormAuthInfoStepModel;
  code: RecoveryPasswordFormCodeStepModel;
  changePassword: RecoveryPasswordFormChangePasswordStepModel;
  success: RecoveryPasswordFormSuccessStepModel;
}

export interface RecoveryPasswordFormAuthInfoStepModel {
  email?: string;
  phone?: string;
}

export interface RecoveryPasswordFormCodeStepModel {
  code: string;
}

export interface RecoveryPasswordFormChangePasswordStepModel {
  password: string;
  confirmPassword: string;
}

export interface RecoveryPasswordFormSuccessStepModel {}

export enum RecoveryPasswordFormStepNames {
  authInfo = "authInfo",
  code = "code",
  changePassword = "changePassword",
  success = "success",
}

export enum RecoveryPasswordFormAuthInfoStepNames {
  email = "email",
  phone = "phone",
}

export enum RecoveryPasswordFormCodeStepNames {
  code = "code",
}

export enum RecoveryPasswordFormChangePasswordStepNames {
  password = "password",
  confirmPassword = "confirmPassword",
}
