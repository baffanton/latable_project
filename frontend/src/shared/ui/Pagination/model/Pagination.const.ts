import { PaginationConfigModel, PaginationModel } from "./Pagination.types";

export const defaultPaginationConfig: PaginationConfigModel = {
  defaultCurrent: 1,
  defaultPageSize: 5,
  defaultPageSizeOptions: [5, 10, 20],
};

export const defaultPagination: PaginationModel = {
  offset: 0,
  limit: defaultPaginationConfig.defaultPageSize,
};
