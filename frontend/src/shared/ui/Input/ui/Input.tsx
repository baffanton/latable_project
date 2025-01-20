import { Input as AntdInput, InputProps as AntdInputProps } from "antd";
import { InputTypes } from "../model/Input.types";
import { FC } from "react";
import { Skeleton } from "@shared/ui/Skeleton";
import cn from "classnames";
import s from "./Input.module.scss";
import { OTPProps } from "antd/es/input/OTP";
import { PasswordProps } from "antd/es/input";

interface InputProps extends Omit<AntdInputProps, "type" | "size" | "onKeyDown"> {
  type?: InputTypes;
  isLoading?: boolean;
  onKeyDown?: (event: KeyboardEvent) => void;
  length?: number;
}

const Input: FC<InputProps> = ({ type = "text", isLoading = false, onKeyDown, length, className, ...props }) => {
  if (isLoading) {
    return <Skeleton />;
  }

  const classNames = cn(s["input"], s[`input__type_${type}`], className);

  if (type === "password") {
    return <AntdInput.Password className={classNames} {...(props as PasswordProps)} />;
  }

  if (type === "otp") {
    return (
      <AntdInput.OTP className={classNames} onKeyDown={onKeyDown as any} length={length} {...(props as OTPProps)} />
    );
  }

  return <AntdInput className={classNames} {...props} />;
};

export { Input };
