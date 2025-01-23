import { FC } from "react";
import s from "./NotFoundPage.module.scss";
import { RobotOutlined } from "@ant-design/icons";
import { Text } from "@shared/ui/Text/index";
import { Button } from "@shared/ui/Button";
import { useNavigate } from "react-router-dom";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={s["not-found-page"]}>
      <div className={s["not-found-page__icon-container"]}>
        <RobotOutlined />
      </div>
      <div className={s["not-found-page__text"]}>
        <Text font="raleway" size="md" className={s["not-found-page__code"]}>
          Ошибка 404
        </Text>
        <Text font="raleway" size="md" className={s["not-found-page__message"]}>
          Страница не найдена
        </Text>
        <Button className={s["not-found-page__button"]} type="secondary" size="sm" onClick={() => navigate("/")}>
          На главную страницу
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
