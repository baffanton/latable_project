import { Form } from "antd";
import { FC, useContext } from "react";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { validateMessages } from "@shared/validate/validateMessages";
import s from "./styles/AuthorizationForm.module.scss";
import { AuthType } from "./AuthType";
import { LoginModalTypes } from "@entities/Auth/model/types";
import { FormFooter } from "@shared/ui/FormFooter";
import userStore from "@app/stores/UserStore";
import { LoadingContext } from "@shared/context/LoadingContext";

enum AuthorizationFormNames {
  email = "email",
  phone = "phone",
  password = "password",
}

interface AuthorizationFormModel {
  email?: string;
  phone?: string;
  password: string;
}

interface AuthorizationFormProps {
  setIsShowModal: (value: boolean) => void;
  setLoginModalType: (value: LoginModalTypes) => void;
}

const AuthorizationForm: FC<AuthorizationFormProps> = ({ setIsShowModal, setLoginModalType }) => {
  const [form] = Form.useForm();

  const { setIsLoading } = useContext(LoadingContext);

  const onFinishAuth = (values: AuthorizationFormModel) => {
    const { email = "", password } = values;

    setIsLoading(true);

    userStore
      .login(email, password)
      .then(() => {
        setIsShowModal(false);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        validateMessages={validateMessages}
        validateTrigger={["onSubmit"]}
        onFinish={onFinishAuth}
        autoComplete="off"
      >
        <AuthType />
        <Form.Item name={AuthorizationFormNames.password} label="Пароль" rules={[{ required: true }]}>
          <Input type="password" placeholder="Введите пароль" />
        </Form.Item>
        <div className={s["authorization-form__forget-container"]}>
          <Button
            className={s["authorization-form__forget"]}
            type="text"
            onClick={() => setLoginModalType("recovery-password")}
          >
            Забыли пароль?
          </Button>
        </div>
        <div className={s["authorization-form__submit-container"]}>
          <Button size="lg" type="tertiary" htmlType="submit" className={s["authorization-form__submit"]}>
            Войти
          </Button>
        </div>
      </Form>
      <FormFooter
        questionText="Еще не создавали аккаунт?"
        buttonText="Создайте его"
        onClick={() => setLoginModalType("registration")}
      />
    </>
  );
};

export default AuthorizationForm;
