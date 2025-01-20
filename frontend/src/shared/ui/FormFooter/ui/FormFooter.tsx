import { Button } from "@shared/ui/Button";
import { FC } from "react";
import s from "./FormFooter.module.scss";
import { Text } from "@shared/ui/Text";

interface FormFooterProps {
  onClick: () => void;
  questionText: string;
  buttonText: string;
}

const FormFooter: FC<FormFooterProps> = ({ onClick, questionText, buttonText }) => (
  <div className={s["form-footer"]}>
    <Text className={s["form-footer__question"]}>{questionText}</Text>
    <Button className={s["form-footer__button"]} type="text" onClick={onClick}>
      {buttonText}
    </Button>
  </div>
);

export { FormFooter };
