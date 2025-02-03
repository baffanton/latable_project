import { LoginModalTypes } from "@entities/Auth/model/types";
import { validateMessages } from "@shared/validate/validateMessages";
import { Form } from "antd";
import { FC, useState } from "react";
import { RecoveryPasswordFormStepTypes } from "../model/types";
import RecoveryPasswordFormAuthInfoStep from "./RecoveryPasswordFormAuthInfoStep";
import RecoveryPasswordFormCodeStep from "./RecoveryPasswordFormCodeStep";
import RecoveryPasswordChangePasswordStep from "./RecoveryPasswordChangePasswordStep";
import SuccessStep from "@shared/ui/SuccessStep";

interface RecoveryPasswordFormProps {
  setLoginModalType: (value: LoginModalTypes) => void;
}

const RecoveryPasswordForm: FC<RecoveryPasswordFormProps> = ({ setLoginModalType }) => {
  const [currentStep, setCurrentStep] = useState<RecoveryPasswordFormStepTypes>("auth-info");
  const [userId, setUserId] = useState<string | null>(null);

  const [form] = Form.useForm();

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        validateMessages={validateMessages}
        validateTrigger={["onSubmit"]}
        autoComplete="off"
      >
        {currentStep === "auth-info" && (
          <RecoveryPasswordFormAuthInfoStep
            setCurrentStep={setCurrentStep}
            setUserId={setUserId}
            setLoginModalType={setLoginModalType}
          />
        )}
        {currentStep === "code" && <RecoveryPasswordFormCodeStep userId={userId} setCurrentStep={setCurrentStep} />}
        {currentStep === "change-password" && (
          <RecoveryPasswordChangePasswordStep setCurrentStep={setCurrentStep} userId={userId} />
        )}
        {currentStep === "success" && (
          <SuccessStep
            message="Пароль успешно сохранен"
            submitTitle="К авторизации"
            onSubmit={() => setLoginModalType("authorization")}
          />
        )}
      </Form>
    </>
  );
};

export default RecoveryPasswordForm;
