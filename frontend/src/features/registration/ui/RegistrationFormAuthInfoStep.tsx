import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { FC, useContext } from "react";
import { Form } from "antd";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { observer } from "mobx-react-lite";
import s from "./styles/RegistrationFormAuthInfoStep.module.scss";
import { FormFooter } from "@shared/ui/FormFooter";
import { LoginModalTypes } from "@entities/Auth/model/types";
import {
  RegistrationFormAuthInfoStepModel,
  RegistrationFormAuthInfoStepNames,
  RegistrationFormStepNames,
  RegistrationFormStepTypes,
} from "../model/types";
import { AuthType } from "@features/login/ui/AuthType";
import { equalPasswordRule } from "../lib/equalPasswordRule";
import userStore from "@app/stores/UserStore";
import { LoadingContext } from "@shared/context/LoadingContext";

interface RegistrationFormAuthInfoStepProps {
  setCurrentStep: (newStep: RegistrationFormStepTypes) => void;
  setUserId: (userId: string) => void;
  setLoginModalType: (value: LoginModalTypes) => void;
}

const RegistrationFormAuthInfoStep: FC<RegistrationFormAuthInfoStepProps> = ({
  setCurrentStep,
  setUserId,
  setLoginModalType,
}) => {
  const { setIsLoading } = useContext(LoadingContext);

  const form = useFormInstance();

  const onCreateButtonClickHandler = async () => {
    const values: RegistrationFormAuthInfoStepModel = form.getFieldValue(RegistrationFormStepNames.authInfo);

    await form.validateFields();

    setIsLoading(true);

    userStore
      .registrationAuthInfoStep(values.email || "", values.password)
      .then((response) => {
        const { data } = response;

        setUserId(data.id);
        setCurrentStep("code");
      })
      .finally(() => setIsLoading(false));
  };

  const onClickLoginHandler = () => {
    form.resetFields();
    setLoginModalType("authorization");
  };

  return (
    <>
      <AuthType
        emailName={[RegistrationFormStepNames.authInfo, RegistrationFormAuthInfoStepNames.email]}
        phoneName={[RegistrationFormStepNames.authInfo, RegistrationFormAuthInfoStepNames.phone]}
      />
      <Form.Item
        name={[RegistrationFormStepNames.authInfo, RegistrationFormAuthInfoStepNames.password]}
        label="Пароль"
        rules={[{ required: true }, { min: 6 }]}
      >
        <Input type="password" placeholder="Введите пароль" />
      </Form.Item>
      <Form.Item
        name={[RegistrationFormStepNames.authInfo, RegistrationFormAuthInfoStepNames.confirmPassword]}
        label="Подтверждение пароля"
        rules={[{ required: true }, { min: 6 }, equalPasswordRule]}
        validateFirst
      >
        <Input type="password" placeholder="Введите пароль ещё раз" />
      </Form.Item>
      <div className={s["registration-form-auth-info__submit-container"]}>
        <Button
          size="lg"
          type="tertiary"
          className={s["registration-form-auth-info__submit"]}
          onClick={onCreateButtonClickHandler}
        >
          Создать аккаунт
        </Button>
      </div>
      <FormFooter onClick={onClickLoginHandler} questionText="Уже есть аккаунт?" buttonText="Войдите в него" />
    </>
  );
};

export default observer(RegistrationFormAuthInfoStep);
