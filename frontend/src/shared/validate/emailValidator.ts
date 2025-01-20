import { Rule } from "antd/es/form";
import { validateMessages } from "./validateMessages";

const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((([a-zA-Z]+\.)+[a-zA-Z]{2,6}))$/;

export const emailValidator: Rule = {
  type: "email",
  validator: (_, value: string) =>
    regExp.test(value) ? Promise.resolve() : Promise.reject(new Error(validateMessages.types.email)),
};
