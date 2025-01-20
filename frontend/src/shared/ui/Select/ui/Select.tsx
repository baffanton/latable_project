import { Select as AntdSelect, SelectProps as AntdSelectProps, Skeleton } from "antd";
import { FC } from "react";
import s from "./Select.module.scss";
import cn from "classnames";
import { SelectSizeTypes } from "../model/Select.types";

interface SelectProps extends Omit<AntdSelectProps, "size"> {
  isLoading?: boolean;
  size?: SelectSizeTypes;
}

const Select: FC<SelectProps> = ({ isLoading, size = "md", ...props }) => {
  if (isLoading) {
    return <Skeleton />;
  }

  return <AntdSelect className={cn(s["select"], s[`select__size_${size}`], props.className)} {...props} />;
};

export { Select };
