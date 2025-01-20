import $apiInstance from "@app/api/axiosInstance";
import {
  RestaurantGetPopularsResponseModel,
  SearchGetRestaurantsRequestModel,
  SearchGetRestaurantsResponseModel,
} from "./types";

export const getRestaurants = (params: SearchGetRestaurantsRequestModel) =>
  $apiInstance.post<SearchGetRestaurantsResponseModel>("restaurant/get-restaurants", params);

export const getPopularRestaurants = () =>
  $apiInstance.get<RestaurantGetPopularsResponseModel>(`restaurant/get-popular`);
