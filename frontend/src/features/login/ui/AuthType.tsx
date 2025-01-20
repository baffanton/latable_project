import { NamePath } from "antd/es/form/interface";
import { FC, useState } from "react";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import s from "./styles/AuthType.module.scss";
import { Button } from "@shared/ui/Button";
import { Tooltip } from "@shared/ui/Tooltip";
import { Form } from "antd";
import { emailValidator } from "@shared/validate/emailValidator";
import { Input } from "@shared/ui/Input";

type AuthTypes = "phone" | "email";

enum AuthTypeFormNames {
  email = "email",
  phone = "phone",
}

interface AuthTypeProps {
  emailName?: NamePath;
  phoneName?: NamePath;
}

const AuthType: FC<AuthTypeProps> = ({ emailName }) => {
  const [authType, setAuthType] = useState<AuthTypes>("email");

  const form = useFormInstance();

  const onChangeAuthTypeHandler = (value: AuthTypes) => {
    if (value === authType) {
      return;
    }

    form.resetFields();
    setAuthType(value);
  };

  return (
    <div className={s["auth-type"]}>
      <div className={s["auth-type__actions"]}>
        <Button
          className={s["auth-type__action-button"]}
          type={authType === "email" ? "tertiary" : "secondary"}
          onClick={() => onChangeAuthTypeHandler("email")}
        >
          Почта
        </Button>
        <Tooltip title="В разработке">
          <Button
            className={s["auth-type__action-button"]}
            type={authType === "phone" ? "tertiary" : "secondary"}
            onClick={() => onChangeAuthTypeHandler("phone")}
            disabled
          >
            Телефон
          </Button>
        </Tooltip>
      </div>
      <Form.Item
        name={emailName || AuthTypeFormNames.email}
        label="Почта"
        rules={[{ required: authType === "email" }, { ...emailValidator }]}
        validateFirst
      >
        <Input placeholder="Введите электронный адрес" />
      </Form.Item>
    </div>
  );
};

export { AuthType };
