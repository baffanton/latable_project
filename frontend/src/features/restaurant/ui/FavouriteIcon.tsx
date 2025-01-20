import { UserContext } from "@shared/context/UserContext";
import { Tooltip } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import cn from "classnames";
import s from "./styles/FavouriteIcon.module.scss";
import { TagFilled, TagOutlined } from "@ant-design/icons";
import { addPinnedRestaurant, checkPinnedRestaurant, removePinnedRestaurant } from "@entities/User/api/endpoints";

interface FavouriteIconProps {
  restaurantId: number;
  readOnly?: boolean;
}

const FavouriteIcon: FC<FavouriteIconProps> = ({ readOnly = false, restaurantId }) => {
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const {
    user: { id },
  } = useContext(UserContext);

  useEffect(() => {
    const checkPinned = async () => {
      await checkPinnedRestaurant({ userId: id, restaurantId }).then((response) => {
        const { data } = response.data;

        setIsAdded(data);
      });
    };

    checkPinned();
  }, [id, restaurantId]);

  const onClickPinHandle = async () => {
    if (isAdded) {
      await removePinnedRestaurant({ userId: id, restaurantId }).then(() => setIsAdded(false));
      return;
    }

    await addPinnedRestaurant({ userId: id, restaurantId }).then(() => setIsAdded(true));
  };

  const tooltipTitle = isAdded ? "Удалить из избранного" : "Добавить в избранное";

  const props = {
    className: cn(s["favourite-icon"], readOnly && s["favourite-icon_read-only"]),
    onClick: () => !readOnly && onClickPinHandle(),
  };

  return (
    <Tooltip title={readOnly ? "" : tooltipTitle}>
      {isAdded ? <TagFilled {...props} /> : <TagOutlined {...props} />}
    </Tooltip>
  );
};

export { FavouriteIcon };
