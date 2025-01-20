import { FC, ReactNode } from "react";
import { TitleFontTypes, TitleSizeTypes } from "../model/Title.types";
import { Skeleton } from "@shared/ui/Skeleton";
import cn from "classnames";
import s from "./Title.module.scss";

interface TitleProps {
  children: ReactNode;
  isLoading?: boolean;
  size?: TitleSizeTypes;
  className?: string;
  font?: TitleFontTypes;
  onClick?: () => void;
}

const Title: FC<TitleProps> = ({
  isLoading = false,
  size = "sm",
  className = "",
  font = "raleway",
  children,
  onClick,
}) => {
  if (isLoading) {
    return <Skeleton type="title" size={size} />;
  }

  return (
    <p
      className={cn(
        s["title"],
        s[`title__size_${size}`],
        s[`title__font_${font}`],
        onClick && s["title_pointer"],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export { Title };
