import { FC, useState } from "react";
import s from "./styles/RestaurantBanner.module.scss";
import { getBackgroudImage } from "../lib/getBackgroudImage";
import { RestaurantModel } from "../model/types";
import { useNavigate } from "react-router-dom";
import { Text } from "@shared/ui/Text/index";

interface RestaurantBannerProps {
  restaurantData: RestaurantModel;
  index: number;
  setIsOpenModal: (value: boolean) => void;
}

const RestaurantBanner: FC<RestaurantBannerProps> = ({ restaurantData, index, setIsOpenModal }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const navigate = useNavigate();

  const { id, name } = restaurantData;

  const onOpenRestarauntCardHandler = (restaurantId: number) => {
    setIsOpenModal(false);
    navigate(`/restaurant-card/${restaurantId}`);
  };

  return (
    <div
      key={`restaurant__${id}`}
      className={s["restaurant-banner"]}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      onClick={() => onOpenRestarauntCardHandler(id)}
    >
      <div
        className={s["restaurant-banner__image"]}
        style={{
          backgroundImage: `url(${getBackgroudImage(index)})`,
          filter: isFocused ? "opacity(70%)" : "opacity(30%)",
        }}
      />
      <Text pointer size="sm" font="julius-sans-one" className={s["restaurant-banner__name"]}>
        {name}
      </Text>
    </div>
  );
};

export { RestaurantBanner };
