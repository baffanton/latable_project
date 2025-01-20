import { Rule } from "antd/es/form";
import { RecoveryPasswordFormChangePasswordStepNames, RecoveryPasswordFormStepNames } from "../model/types";

export const equalPasswordRule: Rule = ({ getFieldValue }) => ({
  validator: (_, value) =>
    !value ||
    getFieldValue([
      RecoveryPasswordFormStepNames.changePassword,
      RecoveryPasswordFormChangePasswordStepNames.password,
    ]) === value
      ? Promise.resolve()
      : Promise.reject(new Error("Пароли должны совпадать")),
});
