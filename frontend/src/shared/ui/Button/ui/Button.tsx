import { FC, ReactNode } from "react";
import cn from "classnames";
import "./Button.scss";
import { ButtonSizeTypes, ButtonTypes } from "../model/Button.types";
import { TextSizeTypes } from "@shared/ui/Text/model/Text.types";

interface ButtonProps {
  children: ReactNode;
  size?: ButtonSizeTypes;
  type?: ButtonTypes;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  htmlType?: "submit" | "button" | "reset";
  textSize?: TextSizeTypes;
}

const Button: FC<ButtonProps> = ({
  children,
  className = "",
  size = "sm",
  type = "primary",
  disabled = false,
  onClick,
  htmlType,
  textSize = "sm",
}) => {
  const onClickHandler = () => {
    !disabled && onClick?.();
  };

  return (
    <button
      className={cn(
        "button",
        `button__size_${size}`,
        `button__type_${type}`,
        `button__text-size_${textSize}`,
        disabled && "button_disabled",
        className,
      )}
      onClick={onClickHandler}
      type={htmlType}
    >
      {children}
    </button>
  );
};

export { Button };
