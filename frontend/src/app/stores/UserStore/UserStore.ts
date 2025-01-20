import { makeAutoObservable } from "mobx";
import axios from "axios";
import { UserModel } from "@entities/User/model/types";
import { BASE_URL } from "@app/api/axiosInstance";
import { RefreshResponseModel } from "@entities/Auth/api/types";
import {
  recoveryPasswordAuthInfoStep,
  recoveryPasswordChangePasswordStep,
  recoveryPasswordCodeStep,
  recoveryPasswordSendCodeAgain,
} from "@features/recovery-password/api/endpoints";
import { login, logout } from "@features/login/api/entpoints";
import {
  registrationAuthInfoStep,
  registrationCodeStep,
  registrationSendCodeAgain,
  registrationUserInfoStep,
} from "@features/registration/api/endpoints";

class UserStore {
  user = {} as UserModel;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: UserModel) {
    this.user = user;
  }

  async login(email: string, password: string) {
    const response = await login({ email, password });

    localStorage.setItem("token", response.data.accessToken);

    this.setAuth(true);
    this.setUser(response.data.user);
  }

  async registrationAuthInfoStep(email: string, password: string) {
    return await registrationAuthInfoStep({ email, password });
  }

  async registrationCodeStep(userId: string, code: string) {
    const response = await registrationCodeStep({ id: userId, code });

    if (response.status == 200) {
      return response;
    }
  }

  async registrationUserInfoStep(userData: UserModel) {
    const response = await registrationUserInfoStep(userData);

    localStorage.setItem("token", response.data.accessToken);

    this.setAuth(true);
    this.setUser(response.data.user);
  }

  async registrationSendCodeAgain(id: string) {
    await registrationSendCodeAgain({ id });
  }

  async logout() {
    await logout();

    localStorage.removeItem("token");

    this.setAuth(false);
    this.setUser({} as UserModel);
  }

  async checkAuth() {
    const response = await axios.get<RefreshResponseModel>(`${BASE_URL}/user/refresh`, { withCredentials: true });

    localStorage.setItem("token", response.data.accessToken);

    this.setAuth(true);
    this.setUser(response.data.user);
  }

  async recoveryPasswordAuthInfoStep(email?: string, phone?: string) {
    return await recoveryPasswordAuthInfoStep({ email, phone });
  }

  async recoveryPasswordCodeStep(userId: string, code: string) {
    const response = await recoveryPasswordCodeStep({ id: userId, code });

    if (response.status === 200) {
      return response;
    }
  }

  async recoveryPasswordSendCodeAgain(id: string) {
    await recoveryPasswordSendCodeAgain({ id });
  }

  async recoveryPasswordChangePasswordStep(userId: string, password: string) {
    const response = await recoveryPasswordChangePasswordStep({ id: userId, password });

    if (response.status === 200) {
      return response;
    }
  }
}

export { UserStore };
