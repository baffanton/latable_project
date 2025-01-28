import $apiInstance from "@app/api/axiosInstance";
import {
  RestaurantGetPopularsResponseModel,
  SearchGetRestaurantsRequestModel,
  SearchGetRestaurantsResponseModel,
} from "./types";
import { Option } from "@shared/types/Option";

export const getRestaurants = (params: SearchGetRestaurantsRequestModel) =>
  $apiInstance.post<SearchGetRestaurantsResponseModel>("restaurant/get-restaurants", params);

export const getPopularRestaurants = () =>
  $apiInstance.get<RestaurantGetPopularsResponseModel>(`restaurant/get-popular`);

export const getCuisineDictionary = () => $apiInstance.get<Option[]>(`dictionary/get-cuisine`);

export const getDistrictDictionary = () => $apiInstance.get<Option[]>(`dictionary/get-district`);

export const getEstablishmentTypeDictionary = () => $apiInstance.get<Option[]>(`dictionary/get-establishment-type`);

export const getSortTypeDictionary = () => $apiInstance.get<Option[]>(`dictionary/get-sort-type`);
