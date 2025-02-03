import { validateMessages } from "@shared/validate/validateMessages";
import { Form } from "antd";
import { FC, useState } from "react";
import { LoginModalTypes } from "@entities/Auth/model/types";
import RegistrationFormAuthInfoStep from "./RegistrationFormAuthInfoStep";
import RegistrationFormUserInfoStep from "./RegistrationFormUserInfoStep";
import { RegistrationFormStepTypes } from "../model/types";
import RegistrationCodeStep from "./RegistrationCodeStep";
import SuccessStep from "@shared/ui/SuccessStep";

interface RegistrationFormProps {
  setIsShowModal: (value: boolean) => void;
  setLoginModalType: (value: LoginModalTypes) => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({ setIsShowModal, setLoginModalType }) => {
  const [currentStep, setCurrentStep] = useState<RegistrationFormStepTypes>("auth-info");
  const [userId, setUserId] = useState<string | null>(null);

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      validateMessages={validateMessages}
      validateTrigger={["onSubmit"]}
      autoComplete="off"
    >
      {currentStep === "auth-info" && (
        <RegistrationFormAuthInfoStep
          setCurrentStep={setCurrentStep}
          setUserId={setUserId}
          setLoginModalType={setLoginModalType}
        />
      )}
      {currentStep === "code" && <RegistrationCodeStep userId={userId} setCurrentStep={setCurrentStep} />}
      {currentStep === "user-info" && <RegistrationFormUserInfoStep setCurrentStep={setCurrentStep} userId={userId} />}
      {currentStep === "success" && (
        <SuccessStep
          message="Регистрация успешно завершена"
          submitTitle="Закрыть"
          onSubmit={() => setIsShowModal(false)}
        />
      )}
    </Form>
  );
};

export default RegistrationForm;
