import { Pagination as AntdPagination, PaginationProps as AntdPaginationProps } from "antd";
import { FC, useMemo, useState } from "react";
import { PaginationConfigModel } from "../model/Pagination.types";
import { defaultPaginationConfig } from "../model/Pagination.const";
import "./Pagination.scss";

interface PaginationProps extends AntdPaginationProps {
  config?: PaginationConfigModel;
  onChange: (offset: number, limit: number) => void;
}

const Pagination: FC<PaginationProps> = ({ config = defaultPaginationConfig, total, onChange }) => {
  const { defaultCurrent, defaultPageSize, defaultPageSizeOptions } = config;

  const [current, setCurrent] = useState<number>(defaultCurrent);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);
  const pageSizeOptions = useMemo(() => defaultPageSizeOptions, [defaultPageSizeOptions]);

  const onChangeHandler = (page: number, pageSize: number) => {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    onChange(offset, limit);
    setCurrent(page);
  };

  const onShowSizeChangeHandler = (_current: number, size: number) => {
    setPageSize(size);
    setCurrent(1);
  };

  return (
    <AntdPagination
      className="pagination"
      current={current}
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      total={total}
      onChange={onChangeHandler}
      showSizeChanger
      onShowSizeChange={onShowSizeChangeHandler}
      locale={{ items_per_page: "" }}
    />
  );
};

export { Pagination };
