import { FC, lazy, Suspense, useState } from "react";
import s from "./LoginModal.module.scss";
import { Modal } from "@shared/ui/Modal";
import { Spin } from "@shared/ui/Spin";
import { LoginModalTypes } from "../model/types";
import { LoadingContext } from "../model/LoadingContext";
import AuthorizationForm from "@features/login/ui/AuthorizationForm";
import cn from "classnames";

const RegistrationForm = lazy(() => import("@features/registration/ui/RegistrationForm"));
const RecoveryPasswordForm = lazy(() => import("@features/recovery-password/ui/RecoveryPasswordForm"));

const getTitleByLoginModalType = (loginModalType: LoginModalTypes): string => {
  switch (loginModalType) {
    case "authorization":
      return "Авторизация";
    case "registration":
      return "Регистрация";
    case "recovery-password":
      return "Восстановление пароля";
    default:
      return "";
  }
};

interface LoginModalProps {
  setIsShowModal: (newValue: boolean) => void;
}

const LoginModal: FC<LoginModalProps> = ({ setIsShowModal }) => {
  const [loginModalType, setLoginModalType] = useState<LoginModalTypes>("authorization");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onCloseModalHandler = () => {
    setLoginModalType("authorization");
    setIsShowModal(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading: isLoading, setIsLoading: setIsLoading }}>
      <Modal
        open
        title={getTitleByLoginModalType(loginModalType)}
        footer={null}
        onCancel={onCloseModalHandler}
        className={cn(s["login-modal"], s[`login-modal_${loginModalType}`])}
        destroyOnClose
        centered
      >
        {isLoading && <Spin size="large" />}
        {loginModalType === "authorization" && (
          <AuthorizationForm setIsShowModal={setIsShowModal} setLoginModalType={setLoginModalType} />
        )}
        {loginModalType === "registration" && (
          <Suspense fallback={<Spin transparent classNameContainer={s["login-modal_loading"]} size="large" />}>
            <RegistrationForm setIsShowModal={setIsShowModal} setLoginModalType={setLoginModalType} />
          </Suspense>
        )}
        {loginModalType === "recovery-password" && (
          <Suspense fallback={<Spin transparent classNameContainer={s["login-modal_loading"]} size="large" />}>
            <RecoveryPasswordForm setLoginModalType={setLoginModalType} />
          </Suspense>
        )}
      </Modal>
    </LoadingContext.Provider>
  );
};

export default LoginModal;
