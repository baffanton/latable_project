import { Button } from "@shared/ui/Button";
import { FC } from "react";
import { Text } from "@shared/ui/Text/index";
import { CheckCircleOutlined } from "@ant-design/icons";
import s from "./SuccessStep.module.scss";

interface SuccessStepProps {
  message: string;
  submitTitle: string;
  onSubmit: () => void;
}

const SuccessStep: FC<SuccessStepProps> = ({ message, submitTitle, onSubmit }) => (
  <div className={s["success-step"]}>
    <div className={s["success-step__message-container"]}>
      <CheckCircleOutlined className={s["success-step__icon"]} />
      <Text className={s["success-step__message"]}>{message}</Text>
    </div>
    <div className={s["success-step__submit-container"]}>
      <Button size="lg" type="tertiary" className={s["success-step__submit"]} onClick={onSubmit}>
        {submitTitle}
      </Button>
    </div>
  </div>
);

export default SuccessStep;
