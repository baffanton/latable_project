import { RefreshResponseModel } from "@entities/Auth/api/types";
import axios from "axios";

export const BASE_URL = "http://localhost:8080";

const $apiInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

$apiInstance.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return config;
});

$apiInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      try {
        const response = await axios.get<RefreshResponseModel>(`${BASE_URL}/user/refresh`, { withCredentials: true });

        localStorage.setItem("token", response.data.accessToken);

        return $apiInstance.request(originalRequest);
      } catch (e) {
        console.log("Ошибка при попытке обновить токен. Пользователь не авторизован");
      }
    }

    throw error;
  },
);

export default $apiInstance;
