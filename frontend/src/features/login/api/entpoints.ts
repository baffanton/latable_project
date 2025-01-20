import $apiInstance from "@app/api/axiosInstance";
import { LoginRequestModel, LoginResponseModel } from "./types";

export const login = (params: LoginRequestModel) => $apiInstance.post<LoginResponseModel>("user/login", params);

export const logout = () => $apiInstance.get<void>("user/logout");
