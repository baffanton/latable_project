import { FC, useContext } from "react";
import { RestaurantModel } from "../model/types";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@shared/context/UserContext";
import s from "./styles/RestaurantMiniCard.module.scss";
import cn from "classnames";
import { RobotOutlined, StarFilled } from "@ant-design/icons";
import { prettifyPhoneNumber } from "../lib/prettifyPhoneNumber";
import { Image } from "@shared/ui/Image/index";
import { FavouriteIcon } from "@features/restaurant/ui/FavouriteIcon";
import { Text } from "@shared/ui/Text/index";
import { Title } from "@shared/ui/Title";

interface RestaurantMiniCardProps {
  restaurantInfo: RestaurantModel;
}

const RestaurantMiniCard: FC<RestaurantMiniCardProps> = ({ restaurantInfo }) => {
  const navigate = useNavigate();

  const { isAuth } = useContext(UserContext);

  const { id, image, address, phoneNumber, cuisine, averageCheck, rating, workMode, name } = restaurantInfo;

  const baseData = [
    {
      id: "phone",
      title: "Телефон:",
      isNumber: true,
      value: prettifyPhoneNumber(phoneNumber[0]),
    },
    {
      id: "adress",
      title: "Адрес:",
      isNumber: false,
      value: address[0],
    },
    {
      id: "cuisine",
      title: "Кухня:",
      isNumber: false,
      value: cuisine,
    },
    {
      id: "averageCheck",
      title: "Средний чек:",
      isNumber: true,
      value: `${averageCheck.toLocaleString()} ₽`,
    },
  ];

  return (
    <div className={s["restaurant-mini-card"]} onClick={() => navigate(`/restaurant-card/${id}`)}>
      <div className={s["restaurant-mini-card__image-container"]}>
        {image ? (
          <Image
            className={s["restaurant-mini-card__image"]}
            src={`data:image/png;base64,${image[0]}`}
            alt="Изображение ресторана"
          />
        ) : (
          <div className={s["restaurant-mini-card__image-empty-container"]}>
            <RobotOutlined className={s["restaurant-mini-card__image-empty"]} />
          </div>
        )}
      </div>
      <div className={s["restaurant-mini-card__info-container"]}>
        <div className={s["restaurant-mini-card__name-container"]}>
          <Title font="julius-sans-one" size="xs" className={s["restaurant-mini-card__name"]}>
            {name}
          </Title>
          {isAuth && <FavouriteIcon restaurantId={id} />}
        </div>
        <div className={s["restaurant-mini-card__info"]}>
          <div className={s["restaurant-mini-card__main-info"]}>
            {baseData.map((item) => (
              <div key={item.id} className={s["restaurant-mini-card__main-info-item"]}>
                <Text font="playfair-display" size="xs" className={s["restaurant-mini-card__info-title"]}>
                  {item.title}
                </Text>
                <Text
                  font={item.isNumber ? "abel" : "playfair-display"}
                  size={item.isNumber ? "sm" : "xs"}
                  className={cn(
                    s["restaurant-mini-card__info-value"],
                    item.isNumber && s["restaurant-mini-card__info-value_number"],
                  )}
                >
                  {item.value}
                </Text>
              </div>
            ))}
            <div className={s["restaurant-mini-card__main-info-item"]}>
              <Text font="playfair-display" size="xs" className={s["restaurant-mini-card__info-title"]}>
                Оценка:
              </Text>
              <div className={cn(s["restaurant-mini-card__info-value"], s["restaurant-mini-card__info-value_rating"])}>
                <Text font="abel" className={s["restaurant-mini-card__rating-data"]}>
                  {rating.totalRating}
                </Text>
                <StarFilled className={s["restaurant-mini-card__rating-icon"]} />
                <Text size="xs" className={s["restaurant-mini-card__rating-count"]}>
                  (<div className={s["restaurant-mini-card__rating-count_digit"]}>{rating.reviewCount}</div>оценок)
                </Text>
              </div>
            </div>
          </div>
          <div className={s["restaurant-mini-card__work-mode"]}>
            <Text font="playfair-display" className={s["restaurant-mini-card__title"]}>
              Время работы
            </Text>
            <div className={s["restaurant-mini-card__work-mode-content"]}>
              {workMode.map(({ firstDay, lastDay, timeFrom, timeTo }, index) => (
                <div key={`work-mode__${index}`} className={s["restaurant-mini-card__work-mode-content-item"]}>
                  <Text
                    font="playfair-display"
                    className={s["restaurant-mini-card__work-days"]}
                  >{`${firstDay}-${lastDay}`}</Text>
                  <Text font="abel" className={s["restaurant-mini-card__work-time"]}>{`${timeFrom}-${timeTo}`}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { RestaurantMiniCard };
