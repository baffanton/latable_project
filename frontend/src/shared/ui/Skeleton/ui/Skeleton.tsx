import { FC } from "react";
import s from "./Skeleton.module.scss";
import cn from "classnames";
import { SkeletonType } from "../model/types/Skeleton.types";
import { ButtonSizeTypes } from "@shared/ui/Button/model/Button.types";
import { TitleSizeTypes } from "@shared/ui/Title/model/Title.types";

interface SkeletonProps {
  type?: SkeletonType;
  className?: string;
  size?: ButtonSizeTypes | TitleSizeTypes;
}

const Skeleton: FC<SkeletonProps> = ({ type = "text", className = "", size = "md" }) => {
  return (
    <div className={cn(s["skeleton"], s[`skeleton__type_${type}`], s[`skeleton__size_${size}`], ...className)}></div>
  );
};

export { Skeleton };
