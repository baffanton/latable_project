import { FC, ReactNode } from "react";
import { TextFontTypes, TextSizeTypes } from "../model/Text.types";
import cn from "classnames";
import "./Text.scss";

interface TextProps {
  size?: TextSizeTypes;
  font?: TextFontTypes;
  className?: string;
  children: ReactNode;
  pointer?: boolean;
}

const Text: FC<TextProps> = ({ size = "sm", font = "raleway", className = "", children, pointer = false }) => {
  const classNames = cn("text", `text__size_${size}`, `text__font_${font}`, pointer && "text_pointer", className);

  return <p className={classNames}>{children}</p>;
};

export { Text };
