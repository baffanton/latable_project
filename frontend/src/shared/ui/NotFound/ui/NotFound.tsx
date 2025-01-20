import { FC } from "react";
import s from "./NotFound.module.scss";
import { RobotOutlined } from "@ant-design/icons";
import { Text } from "@shared/ui/Text";

interface NotFoundProps {
  message?: string;
}

const NotFound: FC<NotFoundProps> = ({ message = "Ничего не найдено" }) => (
  <div className={s["not-found"]}>
    <RobotOutlined className={s["not-found__icon-container"]} />
    <Text size="xs" font="raleway">
      {message}
    </Text>
  </div>
);

export { NotFound };
