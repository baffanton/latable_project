import { PaginationModel } from "@shared/ui/Pagination/model/Pagination.types";

export type FilterModeType = "IsEqual" | "GreaterThanOrEqualTo" | "LessThanOrEqualTo";

export interface FilterItemModel {
  field: string;
  mode: FilterModeType;
  value: FilterValueTypes;
}

export interface FilterRequestModel {
  searchValue: string;
  filters: FilterItemModel[];
  pagination?: PaginationModel;
}

export type FilterType = "radio" | "checkbox" | "range";

export type FilterValueTypes = number | number[] | string | string[];

export interface FilterModel<T> {
  key: T;
  title: string;
  filterType: FilterType;
  filterMode: FilterModeType;
  dataSource: () => Promise<any>;
  defaultValue?: FilterValueTypes;
  activeByDefault?: boolean;
}
