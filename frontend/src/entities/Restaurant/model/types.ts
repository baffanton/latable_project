export type EstablishmentTypes = "Фастфуд" | "Бар" | "Ресторан" | "Гриль" | "Кафе";

export type DistrictTypes =
  | "Дзержинский район"
  | "Индустриальный район"
  | "Кировский район"
  | "Ленинский район"
  | "Мотовилихинский район"
  | "Орджоникиздевский район"
  | "Свердловский район";

export type CuisineTypes =
  | "Европейская кухня"
  | "Средиземноморская кухня"
  | "Латиноамериканская кухня"
  | "Азиатская кухня"
  | "Африканская кухня";

export interface RestaurantModel {
  id: number;
  name: string;
  address: string;
  image: string[] | null;
  phoneNumber: string;
  district: DistrictTypes;
  establishmentType: EstablishmentTypes;
  rating: RestaurantRatingModel;
  link: RestaurantLinksModel;
  cuisine: CuisineTypes;
  averageCheck: number;
  workMode: RestaurantWorkModeModel[];
}

export interface RestaurantLinksModel {
  vk: string | null;
  instagram: string | null;
  site: string | null;
}

export interface RestaurantRatingModel {
  totalRating: number;
  reviewCount: number;
  comments: RestaurantRatingReviewModel[];
}

export interface RestaurantRatingReviewModel {
  reviewId: number;
  userName: string;
  publicationDate: string;
  rating: number;
  comment: string;
}

export interface RestaurantWorkModeModel {
  firstDay: string;
  lastDay: string;
  timeFrom: string;
  timeTo: string;
}
