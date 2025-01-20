import $apiInstance from "@app/api/axiosInstance";
import {
  RecoveryPasswordAuthInfoStepRequestModel,
  RecoveryPasswordAuthInfoStepResponseModel,
  RecoveryPasswordChangePasswordStepRequestModel,
  RecoveryPasswordCodeStepRequestModel,
  RecoveryPasswordSendCodeAgainRequestModel,
} from "./types";

export const recoveryPasswordAuthInfoStep = (params: RecoveryPasswordAuthInfoStepRequestModel) =>
  $apiInstance.post<RecoveryPasswordAuthInfoStepResponseModel>("user/recovery", params);

export const recoveryPasswordCodeStep = (params: RecoveryPasswordCodeStepRequestModel) =>
  $apiInstance.post<void>("user/recovery/code", params);

export const recoveryPasswordSendCodeAgain = (params: RecoveryPasswordSendCodeAgainRequestModel) =>
  $apiInstance.post<void>("user/recovery/code-again", params);

export const recoveryPasswordChangePasswordStep = (params: RecoveryPasswordChangePasswordStepRequestModel) =>
  $apiInstance.post<void>("user/recovery/password", params);
