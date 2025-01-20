import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { FC, useContext, useState } from "react";
import { Form } from "antd";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { Text } from "@shared/ui/Text";
import { observer } from "mobx-react-lite";
import { ModalContext } from "@shared/context/ModalContext";
import s from "./styles/RecoveryPasswordCodeStep.module.scss";
import { LoadingContext } from "@entities/Auth/model/LoadingContext";
import {
  RecoveryPasswordFormAuthInfoStepNames,
  RecoveryPasswordFormCodeStepModel,
  RecoveryPasswordFormCodeStepNames,
  RecoveryPasswordFormStepNames,
  RecoveryPasswordFormStepTypes,
} from "../model/types";
import { UserContext } from "@shared/context/UserContext";

interface RecoveryPasswordCodeStepProps {
  userId: string | null;
  setCurrentStep: (newStep: RecoveryPasswordFormStepTypes) => void;
}

const RecoveryPasswordCodeStep: FC<RecoveryPasswordCodeStepProps> = ({ userId, setCurrentStep }) => {
  const [isDisabledSendAgainButton, setIsDisabledSendAgainButton] = useState<boolean>(false);

  const modal = useContext(ModalContext);
  const { setIsLoading } = useContext(LoadingContext);
  const userStore = useContext(UserContext);

  const form = useFormInstance();

  const emailValue = form.getFieldValue([
    RecoveryPasswordFormStepNames.authInfo,
    RecoveryPasswordFormAuthInfoStepNames.email,
  ]);

  const onKeyDownHandler = (event: KeyboardEvent) => {
    if (!/^[0-9]{1}$/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete") {
      event.preventDefault();
    }
  };

  const onSendCodeButtonClickHandler = async () => {
    const values: RecoveryPasswordFormCodeStepModel = form.getFieldValue(RecoveryPasswordFormStepNames.code);

    await form.validateFields();

    setIsLoading(true);

    userStore
      .recoveryPasswordCodeStep(userId || "", values.code)
      .then(() => setCurrentStep("change-password"))
      .finally(() => setIsLoading(false));
  };

  const onSendCodeAgainButtonHandler = async () => {
    setIsDisabledSendAgainButton(true);

    await form.validateFields();

    setIsLoading(true);

    userStore
      .recoveryPasswordSendCodeAgain(userId || "")
      .then(() => {
        modal({
          type: "info",
          title: "Информация",
          content: `Код выслан на ${emailValue}`,
          icon: <div />,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className={s["recovery-password-code-step__message-container"]}>
        <Text size="xs">
          На <span className={s["recovery-password-code-step__message"]}>{emailValue}</span> выслано сообщение с кодом
          для подтверждения регистрации. Введите его!
        </Text>
      </div>
      <Form.Item name={[RecoveryPasswordFormStepNames.code, RecoveryPasswordFormCodeStepNames.code]}>
        <Input type="otp" onKeyDown={onKeyDownHandler} length={6} />
      </Form.Item>
      <div className={s["recovery-password-code-step__submit-container"]}>
        <Button
          size="lg"
          type="tertiary"
          className={s["recovery-password-code-step__submit"]}
          onClick={onSendCodeButtonClickHandler}
        >
          Отправить код
        </Button>
      </div>
      <div className={s["recovery-password-code-step__send-again-container"]}>
        <Text className={s["recovery-password-code-step__send-again-text"]}>Не пришел код?</Text>
        <Button
          className={s["recovery-password-code-step__send-again"]}
          type="text"
          onClick={onSendCodeAgainButtonHandler}
          disabled={isDisabledSendAgainButton}
        >
          Отправить код снова
        </Button>
      </div>
    </>
  );
};

export default observer(RecoveryPasswordCodeStep);
