export interface PaginationModel {
  offset: number;
  limit: number;
}

export interface PaginationConfigModel {
  defaultCurrent: number;
  defaultPageSize: number;
  defaultPageSizeOptions: number[];
}
