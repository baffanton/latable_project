export interface RecoveryPasswordAuthInfoStepRequestModel {
  email?: string;
  phone?: string;
}

export interface RecoveryPasswordAuthInfoStepResponseModel {
  id: string;
}

export interface RecoveryPasswordCodeStepRequestModel {
  id: string;
  code: string;
}

export interface RecoveryPasswordChangePasswordStepRequestModel {
  id: string;
  password: string;
}

export interface RecoveryPasswordSendCodeAgainRequestModel {
  id: string;
}
