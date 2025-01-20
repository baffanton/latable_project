import { FC, ReactNode } from "react";
import cn from "classnames";
import { Skeleton } from "@shared/ui/Skeleton";
import s from "./Button.module.scss";
import { ButtonSizeTypes, ButtonTypes } from "../model/Button.types";
import { TextSizeTypes } from "@shared/ui/Text/model/Text.types";

interface ButtonProps {
  children: ReactNode;
  isLoading?: boolean;
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
  isLoading = false,
  className = "",
  size = "sm",
  type = "primary",
  disabled = false,
  onClick,
  htmlType,
  textSize = "sm",
}) => {
  if (isLoading) {
    return <Skeleton type="button" />;
  }

  const onClickHandler = () => {
    !disabled && onClick?.();
  };

  return (
    <button
      className={cn(
        s["button"],
        s[`button__size_${size}`],
        s[`button__type_${type}`],
        s[`button__text-size_${textSize}`],
        disabled && s["button_disabled"],
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
