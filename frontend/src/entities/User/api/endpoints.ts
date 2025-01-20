import $apiInstance from "@app/api/axiosInstance";
import { Option } from "@shared/types/Option";
import {
  AddPinnedRestaurantRequestModel,
  CheckPinnedRestaurantRequestModel,
  CheckPinnedRestaurantResponseModel,
  RemovePinnedRestaurantRequestModel,
} from "./types";

export const getAgeDictionary = () => $apiInstance.get<Option[]>("/dictionary/get-age");

export const getGenderDictionary = () => $apiInstance.get<Option[]>("/dictionary/get-gender");

export const addPinnedRestaurant = (params: AddPinnedRestaurantRequestModel) =>
  $apiInstance.post<void>("/user/add-pin", params);

export const removePinnedRestaurant = (params: RemovePinnedRestaurantRequestModel) =>
  $apiInstance.post<void>("/user/remove-pin", params);

export const checkPinnedRestaurant = (params: CheckPinnedRestaurantRequestModel) =>
  $apiInstance.post<CheckPinnedRestaurantResponseModel>("/user/check-pin", params);
