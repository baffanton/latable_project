import { RestaurantModel } from "@entities/Restaurant/model/types";
import { FilterRequestModel } from "@shared/ui/Filter/model/Filter.types";

export interface SearchGetRestaurantsRequestModel extends FilterRequestModel {}

export interface SearchGetRestaurantsResponseModel {
  data: RestaurantModel[];
  total: number;
}

export interface RestaurantGetPopularsResponseModel {
  data: RestaurantModel[];
}
