import { Tooltip as AntdTooltip, TooltipProps } from "antd";
import { FC } from "react";

const Tooltip: FC<TooltipProps> = ({ children, ...props }) => {
  return (
    <AntdTooltip title="check" {...props}>
      {children}
    </AntdTooltip>
  );
};

export { Tooltip };
