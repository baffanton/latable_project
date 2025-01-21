import { FC, ReactNode } from "react";
import { TitleFontTypes, TitleSizeTypes } from "../model/Title.types";
import cn from "classnames";
import s from "./Title.module.scss";

interface TitleProps {
  children: ReactNode;
  size?: TitleSizeTypes;
  className?: string;
  font?: TitleFontTypes;
  onClick?: () => void;
}

const Title: FC<TitleProps> = ({ size = "sm", className = "", font = "raleway", children, onClick }) => {
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
