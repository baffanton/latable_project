import { RestaurantModel } from "@entities/Restaurant/model/types";
import { Spin } from "@shared/ui/Spin";
import { FC, useEffect, useState } from "react";
import s from "./PopularList.module.scss";
import { getPopularRestaurants } from "@entities/Restaurant/api/endpoints";
import { RestaurantMiniCard } from "@entities/Restaurant/ui/RestaurantMiniCard";
import { Title } from "@shared/ui/Title";

const PopularList: FC = () => {
  const [items, setItems] = useState<RestaurantModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getList = async () => {
      setIsLoading(true);

      await getPopularRestaurants().then((response) => {
        setItems(response.data.data);
        // TODO: Разобраться что с finally
        setIsLoading(false);
      });
    };

    getList();
  }, []);

  return (
    <div className={s["popular-list"]}>
      {isLoading && <Spin fullscreen size="large" />}
      <Title font="playfair-display" size="lg" className={s["popular-list__title"]}>
        Список популярных мест
      </Title>
      <div className={s["popular-list__content"]}>
        {items.map((item) => (
          <RestaurantMiniCard key={item.id} restaurantInfo={item} />
        ))}
      </div>
    </div>
  );
};

export default PopularList;
