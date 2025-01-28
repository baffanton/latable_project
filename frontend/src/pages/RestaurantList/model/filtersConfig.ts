import { FilterModel } from "@shared/ui/Filter/model/Filter.types";
import { RestaurantListFilterTypes } from "./RestaurantList.types";
import {
  getCuisineDictionary,
  getDistrictDictionary,
  getEstablishmentTypeDictionary,
  getSortTypeDictionary,
} from "@entities/Restaurant/api/endpoints";

export const filtersConfig: FilterModel<RestaurantListFilterTypes>[] = [
  {
    key: "sort",
    title: "Сортировка",
    filterType: "radio",
    filterMode: "IsEqual",
    dataSource: getSortTypeDictionary,
    defaultValue: 1,
  },
  {
    key: "district",
    title: "Район города",
    filterType: "checkbox",
    filterMode: "IsEqual",
    dataSource: getDistrictDictionary,
  },
  {
    key: "establishmentType",
    title: "Тип заведения",
    filterType: "checkbox",
    filterMode: "IsEqual",
    dataSource: getEstablishmentTypeDictionary,
  },
  {
    key: "cuisine",
    title: "Кухня",
    filterType: "checkbox",
    filterMode: "IsEqual",
    dataSource: getCuisineDictionary,
  },
];
