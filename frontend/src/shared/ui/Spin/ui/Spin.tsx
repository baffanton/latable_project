import { Spin as AntdSpin, SpinProps as AntdSpinProps } from "antd";
import { FC } from "react";
import s from "./Spin.module.scss";
import cn from "classnames";

interface SpinProps extends AntdSpinProps {
  classNameContainer?: string;
  transparent?: boolean;
}

const Spin: FC<SpinProps> = ({ classNameContainer = "", transparent = false, ...props }) => (
  <div className={cn(s["spin__container"], s["spin__container_transparent"], classNameContainer)}>
    <AntdSpin delay={200} {...props} />
  </div>
);

export { Spin };
