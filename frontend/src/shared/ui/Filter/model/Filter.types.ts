import { PaginationModel } from "@shared/ui/Pagination/model/Pagination.types";
import { Option } from "@shared/types/Option";

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
  dataSource: () => Axios.IPromise<Axios.AxiosXHR<Option<string | number>[]>>;
  defaultValue?: FilterValueTypes;
}

export interface FilterItemProps<T> {
  options: Option[];
  filterName: T;
  onChange: (newValue: FilterValueTypes) => void;
  currentValue?: FilterValueTypes;
}
