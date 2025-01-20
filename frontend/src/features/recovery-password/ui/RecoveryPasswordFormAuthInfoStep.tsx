import { FC, useContext } from "react";
import {
  RecoveryPasswordFormAuthInfoStepModel,
  RecoveryPasswordFormAuthInfoStepNames,
  RecoveryPasswordFormStepNames,
  RecoveryPasswordFormStepTypes,
} from "../model/types";
import { UserContext } from "@shared/context/UserContext";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { AuthType } from "@features/login/ui/AuthType";
import { Button } from "@shared/ui/Button";
import s from "./styles/RecoveryPasswordFormAuthInfoStep.module.scss";
import { LoadingContext } from "@entities/Auth/model/LoadingContext";
import { FormFooter } from "@shared/ui/FormFooter/ui/FormFooter";
import { LoginModalTypes } from "@entities/Auth/model/types";

interface RecoveryPasswordFormAuthInfoStepProps {
  setCurrentStep: (value: RecoveryPasswordFormStepTypes) => void;
  setUserId: (value: string) => void;
  setLoginModalType: (value: LoginModalTypes) => void;
}

const RecoveryPasswordFormAuthInfoStep: FC<RecoveryPasswordFormAuthInfoStepProps> = ({
  setCurrentStep,
  setUserId,
  setLoginModalType,
}) => {
  const userStore = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);

  const form = useFormInstance();

  const onSendButtonClickHandler = async () => {
    const values: RecoveryPasswordFormAuthInfoStepModel = form.getFieldValue(RecoveryPasswordFormStepNames.authInfo);

    await form.validateFields();

    setIsLoading(true);

    userStore
      .recoveryPasswordAuthInfoStep(values.email, values.phone)
      .then((response) => {
        const { id } = response.data;

        setUserId(id);
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
        emailName={[RecoveryPasswordFormStepNames.authInfo, RecoveryPasswordFormAuthInfoStepNames.email]}
        phoneName={[RecoveryPasswordFormStepNames.authInfo, RecoveryPasswordFormAuthInfoStepNames.phone]}
      />
      <div className={s["recovery-password-form-auth-info__submit-container"]}>
        <Button
          size="lg"
          type="tertiary"
          className={s["recovery-password-form-auth-info__submit"]}
          onClick={onSendButtonClickHandler}
        >
          Отправить код
        </Button>
      </div>
      <FormFooter
        onClick={onClickLoginHandler}
        questionText="Вспомнили данные для входа?"
        buttonText="Войдите в него"
      />
    </>
  );
};

export { RecoveryPasswordFormAuthInfoStep };
