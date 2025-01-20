import $apiInstance from "@app/api/axiosInstance";
import {
  RegistrationAuthInfoStepRequestModel,
  RegistrationAuthInfoStepResponseModel,
  RegistrationCodeStepRequestModel,
  RegistrationSendCodeAgainRequestModel,
  RegistrationUserInfoStepRequestModel,
  RegistrationUserInfoStepResponseModel,
} from "./types";

export const registrationAuthInfoStep = (params: RegistrationAuthInfoStepRequestModel) =>
  $apiInstance.post<RegistrationAuthInfoStepResponseModel>("user/registration", params);

export const registrationCodeStep = (params: RegistrationCodeStepRequestModel) =>
  $apiInstance.post<void>("user/registration/code", params);

export const registrationSendCodeAgain = (params: RegistrationSendCodeAgainRequestModel) =>
  $apiInstance.post<void>("user/registration/code-again", params);

export const registrationUserInfoStep = (params: RegistrationUserInfoStepRequestModel) =>
  $apiInstance.post<RegistrationUserInfoStepResponseModel>("user/registration/info", params);
