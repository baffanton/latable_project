import { Tooltip } from "antd";
import { FC, useContext, useEffect, useState, MouseEvent } from "react";
import cn from "classnames";
import s from "./styles/FavouriteIcon.module.scss";
import { TagFilled, TagOutlined } from "@ant-design/icons";
import { addPinnedRestaurant, removePinnedRestaurant } from "@entities/User/api/endpoints";
import { observer } from "mobx-react-lite";
import userStore from "@app/stores/UserStore";
import { LoadingContext } from "@shared/context/LoadingContext";
import { ModalContext } from "@shared/context/ModalContext";

interface FavouriteIconProps {
  restaurantId: number;
  isAddedToFavourite: boolean;
  readOnly?: boolean;
}

const FavouriteIcon: FC<FavouriteIconProps> = ({ readOnly = false, restaurantId, isAddedToFavourite }) => {
  const [isAdded, setIsAdded] = useState<boolean>(isAddedToFavourite);

  const { user } = userStore;

  const { setIsLoading } = useContext(LoadingContext);
  const modal = useContext(ModalContext);

  useEffect(() => {
    setIsAdded(isAddedToFavourite);
  }, [isAddedToFavourite]);

  const onClickPinHandle = (event: MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();

    const endpoint = isAdded ? removePinnedRestaurant : addPinnedRestaurant;

    setIsLoading(true);

    endpoint({ userId: user.id, restaurantId }).then(() => {
      setIsAdded(!isAdded);
      setIsLoading(false);

      const contentText = isAdded ? "Ресторан успешно удален из избранных" : "Ресторан успешно добавлен в избранные";

      modal({
        type: "info",
        title: "Информация",
        content: contentText,
        icon: <div />,
      });
    });
  };

  const tooltipTitle = isAdded ? "Удалить из избранного" : "Добавить в избранное";

  const props = {
    className: cn(s["favourite-icon"], readOnly && s["favourite-icon_read-only"]),
    onClick: (event: MouseEvent<HTMLImageElement>) => !readOnly && onClickPinHandle(event),
  };

  return (
    <Tooltip title={readOnly ? "" : tooltipTitle}>
      {isAdded ? <TagFilled {...props} /> : <TagOutlined {...props} />}
    </Tooltip>
  );
};

export default observer(FavouriteIcon);
