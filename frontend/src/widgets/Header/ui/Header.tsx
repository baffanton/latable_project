import { ModalContext } from "@shared/context/ModalContext";
import { UserContext } from "@shared/context/UserContext";
import { FC, lazy, Suspense, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Header.module.scss";
import { Button } from "@shared/ui/Button";
import { Title } from "@shared/ui/Title";
import { Spin } from "@shared/ui/Spin";
import { observer } from "mobx-react-lite";

const LoginModal = lazy(() => import("@entities/Auth/ui/LoginModal"));
const SearchModal = lazy(() => import("@features/restaurant/ui/SearchRestaurantsModal"));

const Header: FC = () => {
  const [isShowAuthModal, setIsShowAuthModal] = useState<boolean>(false);
  const [isShowSearchModal, setIsShowSearchModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userStore = useContext(UserContext);
  const modal = useContext(ModalContext);

  const navigate = useNavigate();

  const onPopularClickHandler = () => navigate("/popular");

  const onLoginClickHandler = () => {
    setIsShowAuthModal(true);
  };

  const onLogoutClickHandler = () => {
    modal({
      title: "Предупреждение",
      content: "Вы уверены, что хотите выйти из аккаута?",
      type: "confirm",
      okText: "Да",
      cancelText: "Нет",
      icon: <div />,
      onOk: () => {
        setIsLoading(true);
        userStore.logout().finally(() => setIsLoading(false));
      },
    });
  };

  const userLoginText = userStore.isAuth ? "Выйти" : "Войти";

  return (
    <div className={s["header"]}>
      {isLoading && <Spin fullscreen size="large" />}
      <Title font="julius-sans-one" size="lg" onClick={() => navigate("/")}>
        LaTable
      </Title>
      <div className={s["header__navigate"]}>
        <Button className={s["header__navigate-item"]} onClick={onPopularClickHandler}>
          Популярное
        </Button>
        <Button className={s["header__navigate-item"]} onClick={() => setIsShowSearchModal(true)}>
          Поиск
        </Button>
        <Button
          className={s["header__navigate-item"]}
          type="secondary"
          onClick={() => (userStore.isAuth ? onLogoutClickHandler() : onLoginClickHandler())}
        >
          {userLoginText}
        </Button>
      </div>
      {isShowAuthModal && (
        <Suspense fallback={<Spin fullscreen size="large" />}>
          <LoginModal setIsShowModal={setIsShowAuthModal} />
        </Suspense>
      )}
      {isShowSearchModal && (
        <Suspense fallback={<Spin fullscreen size="large" />}>
          <SearchModal setIsOpenModal={setIsShowSearchModal} />
        </Suspense>
      )}
    </div>
  );
};

export default observer(Header);
