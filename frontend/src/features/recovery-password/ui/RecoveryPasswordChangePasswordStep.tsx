import { FC, useContext } from "react";
import {
  RecoveryPasswordFormChangePasswordStepModel,
  RecoveryPasswordFormChangePasswordStepNames,
  RecoveryPasswordFormStepNames,
  RecoveryPasswordFormStepTypes,
} from "../model/types";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { Form } from "antd";
import { Input } from "@shared/ui/Input";
import { equalPasswordRule } from "../lib/equalPasswordRule";
import { Button } from "@shared/ui/Button";
import s from "./styles/RecoveryPasswordChangePasswordStep.module.scss";
import { observer } from "mobx-react-lite";
import userStore from "@app/stores/UserStore";
import { LoadingContext } from "@shared/context/LoadingContext";

interface RecoveryPasswordFormChangePasswordStepProps {
  userId: string | null;
  setCurrentStep: (newStep: RecoveryPasswordFormStepTypes) => void;
}

const RecoveryPasswordFormChangePasswordStep: FC<RecoveryPasswordFormChangePasswordStepProps> = ({
  setCurrentStep,
  userId,
}) => {
  const { setIsLoading } = useContext(LoadingContext);

  const form = useFormInstance();

  const onChangePasswordButtonClickHandler = async () => {
    const values: RecoveryPasswordFormChangePasswordStepModel = form.getFieldValue(
      RecoveryPasswordFormStepNames.changePassword,
    );

    await form.validateFields();

    setIsLoading(true);

    userStore
      .recoveryPasswordChangePasswordStep(userId || "", values.password)
      .then(() => setCurrentStep("success"))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Form.Item
        name={[RecoveryPasswordFormStepNames.changePassword, RecoveryPasswordFormChangePasswordStepNames.password]}
        label="Пароль"
        rules={[{ required: true }, { min: 6 }]}
      >
        <Input type="password" placeholder="Введите пароль" />
      </Form.Item>
      <Form.Item
        name={[
          RecoveryPasswordFormStepNames.changePassword,
          RecoveryPasswordFormChangePasswordStepNames.confirmPassword,
        ]}
        label="Подтверждение пароля"
        rules={[{ required: true }, { min: 6 }, equalPasswordRule]}
        validateFirst
      >
        <Input type="password" placeholder="Введите пароль ещё раз" />
      </Form.Item>
      <div className={s["recovery-password-change-password__submit-container"]}>
        <Button
          size="lg"
          type="tertiary"
          className={s["recovery-password-change-password__submit"]}
          onClick={onChangePasswordButtonClickHandler}
        >
          Отправить код
        </Button>
      </div>
    </>
  );
};

export default observer(RecoveryPasswordFormChangePasswordStep);
