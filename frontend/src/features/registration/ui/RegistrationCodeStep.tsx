import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { FC, useContext, useState } from "react";
import { Form } from "antd";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { Text } from "@shared/ui/Text";
import { observer } from "mobx-react-lite";
import { ModalContext } from "@shared/context/ModalContext";
import s from "./styles/RegistrationCodeStep.module.scss";
import { LoadingContext } from "@entities/Auth/model/LoadingContext";
import {
  RegistrationCodeStepModel,
  RegistrationCodeStepNames,
  RegistrationFormAuthInfoStepNames,
  RegistrationFormStepNames,
  RegistrationFormStepTypes,
} from "../model/types";
import { UserContext } from "@shared/context/UserContext";

interface RegistrationCodeStepProps {
  userId: string | null;
  setCurrentStep: (newStep: RegistrationFormStepTypes) => void;
}

const RegistrationCodeStep: FC<RegistrationCodeStepProps> = ({ userId, setCurrentStep }) => {
  const [isDisabledSendAgainButton, setIsDisabledSendAgainButton] = useState<boolean>(false);

  const modal = useContext(ModalContext);
  const { setIsLoading } = useContext(LoadingContext);
  const userStore = useContext(UserContext);

  const form = useFormInstance();

  const emailValue = form.getFieldValue([RegistrationFormStepNames.authInfo, RegistrationFormAuthInfoStepNames.email]);

  const onKeyDownHandler = (event: KeyboardEvent) => {
    if (!/^[0-9]{1}$/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete") {
      event.preventDefault();
    }
  };

  const onSendCodeButtonClickHandler = async () => {
    const values: RegistrationCodeStepModel = form.getFieldValue(RegistrationFormStepNames.code);

    await form.validateFields();

    setIsLoading(true);

    userStore
      .registrationCodeStep(userId || "", values.code)
      .then(() => setCurrentStep("user-info"))
      .finally(() => setIsLoading(false));
  };

  const onSendCodeAgainButtonHandler = async () => {
    setIsDisabledSendAgainButton(true);

    await form.validateFields();

    setIsLoading(true);

    userStore
      .registrationSendCodeAgain(userId || "")
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
      <div className={s["registration-code-step__message-container"]}>
        <Text className={s["registration-code-step__message"]} size="xs">
          На <span className={s["registration-code-step__message_color"]}>{emailValue}</span> выслано сообщение с кодом
          для подтверждения регистрации. Введите его!
        </Text>
      </div>
      <Form.Item name={[RegistrationFormStepNames.code, RegistrationCodeStepNames.code]}>
        <Input type="otp" onKeyDown={onKeyDownHandler} length={6} />
      </Form.Item>
      <div className={s["registration-code-step__submit-container"]}>
        <Button
          size="lg"
          type="tertiary"
          className={s["registration-code-step__submit"]}
          onClick={onSendCodeButtonClickHandler}
        >
          Отправить код
        </Button>
      </div>
      <div className={s["registration-code-step__send-again-container"]}>
        <Text className={s["registration-code-step__send-again-text"]}>Не пришел код?</Text>
        <Button
          className={s["registration-code-step__send-again"]}
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

export default observer(RegistrationCodeStep);
