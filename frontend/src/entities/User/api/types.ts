export interface AddPinnedRestaurantRequestModel {
  userId: string;
  restaurantId: number;
}

export interface RemovePinnedRestaurantRequestModel {
  userId: string;
  restaurantId: number;
}

export interface CheckPinnedRestaurantRequestModel {
  userId: string;
  restaurantId: number;
}

export interface CheckPinnedRestaurantResponseModel {
  data: boolean;
}
