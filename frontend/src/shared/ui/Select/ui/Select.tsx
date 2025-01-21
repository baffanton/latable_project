import { Select as AntdSelect, SelectProps as AntdSelectProps } from "antd";
import { FC } from "react";
import "./Select.scss";
import cn from "classnames";
import { SelectSizeTypes } from "../model/Select.types";

interface SelectProps extends Omit<AntdSelectProps, "size"> {
  size?: SelectSizeTypes;
}

const Select: FC<SelectProps> = ({ size = "md", ...props }) => (
  <AntdSelect className={cn("select", `select__size_${size}`, props.className)} {...props} />
);

export { Select };
