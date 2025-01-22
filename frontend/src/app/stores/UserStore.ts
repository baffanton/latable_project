import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { UserModel } from "@entities/User/model/types";
import $apiInstance, { BASE_URL } from "@app/api/axiosInstance";
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

const tokenKey = "token";
class UserStore {
  user = {} as UserModel;
  isAuth = false;
  isRefreshing = false;

  private _token?: string = localStorage.getItem(tokenKey) ?? undefined;

  get token(): string | undefined {
    return this._token;
  }

  set token(value: string | undefined) {
    if (value == null) {
      localStorage.removeItem(tokenKey);
      return;
    }

    localStorage.setItem(tokenKey, value);
    this._token = value;
  }

  constructor() {
    makeObservable(this, {
      token: computed,
      isAuth: observable,
      user: observable,
      logout: action,
      updateUserInfo: action,
    });
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: UserModel) {
    this.user = user;
  }

  init(): void {
    this.updateUserInfo().catch(() => {
      runInAction(() => {
        this.isAuth = false;
        this.token = undefined;
      });
    });
  }

  async updateUserInfo(): Promise<void> {
    if (this.token == null || this.token.length === 0) {
      this.isAuth = false;
      this.token = undefined;
      return;
    }

    if (this.isRefreshing) {
      return;
    }

    this.isRefreshing = true;

    const result = await $apiInstance.get<RefreshResponseModel>(`${BASE_URL}/user/refresh`, {
      withCredentials: true,
    });

    runInAction(() => {
      if (result.status === 401) {
        this.isAuth = false;
        this.token = undefined;
        this.isRefreshing = false;
        return;
      }

      this.isAuth = true;
      this.user = result.data.user;
      this.token = result.data.accessToken;
      this.isRefreshing = false;
    });
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

const userStore = new UserStore();

export default userStore;
