import { FC, useContext, useEffect, useState } from "react";
import { Option } from "@shared/types/Option";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { UserContext } from "@shared/context/UserContext";
import { LoadingContext } from "@entities/Auth/model/LoadingContext";
import { getAgeDictionary, getGenderDictionary } from "@entities/User/api/endpoints";
import { Form } from "antd";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { Select } from "@shared/ui/Select";
import s from "./styles/RegistrationFormUserInfoStep.module.scss";
import {
  RegistrationFormAuthInfoStepModel,
  RegistrationFormStepNames,
  RegistrationFormStepTypes,
  RegistrationFormUserInfoStepModel,
  RegistrationFormUserInfoStepNames,
} from "../model/types";

interface RegistrationFormUserInfoStepProps {
  userId: string | null;
  setCurrentStep: (newStep: RegistrationFormStepTypes) => void;
}

const RegistrationFormUserInfoStep: FC<RegistrationFormUserInfoStepProps> = ({ userId, setCurrentStep }) => {
  const [ageOptions, setAgeOptions] = useState<Option[]>([]);
  const [genderOptions, setGenderOptions] = useState<Option[]>([]);

  const form = useFormInstance();

  const userStore = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([getAgeDictionary(), getGenderDictionary()])
      .then((responses) => {
        const ageResponse = responses[0];
        const genderResponse = responses[1];

        setAgeOptions((ageResponse as any).data);
        setGenderOptions((genderResponse as any).data);
      })
      .finally(() => setIsLoading(false));
  }, [setIsLoading]);

  const onAcceptButtonClickHandler = async () => {
    const values: RegistrationFormUserInfoStepModel = form.getFieldValue(RegistrationFormStepNames.userInfo);
    const authInfoValues: RegistrationFormAuthInfoStepModel = form.getFieldValue(RegistrationFormStepNames.authInfo);

    await form.validateFields();

    setIsLoading(true);

    userStore
      .registrationUserInfoStep({ ...values, id: userId || "", phone: null, email: authInfoValues.email || "" })
      .then(() => setCurrentStep("success"))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Form.Item
        name={[RegistrationFormStepNames.userInfo, RegistrationFormUserInfoStepNames.name]}
        label="Имя"
        rules={[{ required: true }]}
      >
        <Input placeholder="Введите имя" />
      </Form.Item>
      <Form.Item
        name={[RegistrationFormStepNames.userInfo, RegistrationFormUserInfoStepNames.surname]}
        label="Фамилия"
        rules={[{ required: true }]}
      >
        <Input placeholder="Введите фамилию" />
      </Form.Item>
      <Form.Item
        name={[RegistrationFormStepNames.userInfo, RegistrationFormUserInfoStepNames.age]}
        label="Возраст"
        rules={[{ required: true }]}
      >
        <Select size="md" showSearch options={ageOptions} placeholder="Выберите возраст" />
      </Form.Item>
      <Form.Item
        name={[RegistrationFormStepNames.userInfo, RegistrationFormUserInfoStepNames.gender]}
        label="Пол"
        rules={[{ required: true }]}
      >
        <Select size="md" options={genderOptions} placeholder="Выберите пол" />
      </Form.Item>
      <div className={s["registration-form-user-info__submit-container"]}>
        <Button
          size="lg"
          type="tertiary"
          className={s["registration-form-user-info__submit"]}
          onClick={onAcceptButtonClickHandler}
        >
          Отправить код
        </Button>
      </div>
    </>
  );
};

export default RegistrationFormUserInfoStep;
