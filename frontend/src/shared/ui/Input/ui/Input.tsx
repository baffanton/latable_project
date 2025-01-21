import { Input as AntdInput, InputProps as AntdInputProps } from "antd";
import { InputTypes } from "../model/Input.types";
import { FC } from "react";
import cn from "classnames";
import "./Input.scss";
import { OTPProps } from "antd/es/input/OTP";
import { PasswordProps } from "antd/es/input";

interface InputProps extends Omit<AntdInputProps, "type" | "size" | "onKeyDown"> {
  type?: InputTypes;
  onKeyDown?: (event: KeyboardEvent) => void;
  length?: number;
}

const Input: FC<InputProps> = ({ type = "text", onKeyDown, length, className, ...props }) => {
  const classNames = cn("input", `input__type_${type}`, className);

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
