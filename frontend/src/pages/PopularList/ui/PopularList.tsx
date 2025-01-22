import { RestaurantModel } from "@entities/Restaurant/model/types";
import { Spin } from "@shared/ui/Spin";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import s from "./PopularList.module.scss";
import { getPopularRestaurants } from "@entities/Restaurant/api/endpoints";
import RestaurantMiniCard from "@entities/Restaurant/ui/RestaurantMiniCard";
import { Title } from "@shared/ui/Title";
import { checkPinnedRestaurantList } from "@entities/User/api/endpoints";
import userStore from "@app/stores/UserStore";
import { observer } from "mobx-react-lite";
import { LoadingContext } from "@shared/context/LoadingContext";

const PopularList: FC = () => {
  const [items, setItems] = useState<RestaurantModel[]>([]);
  const [pinnedRestaurants, setPinnedRestaurants] = useState<number[]>([]);
  const [isLoadingItems, setIsLoadingItems] = useState<boolean>(false);
  const [isLoadingPinnedInfo, setIsLoadingPinnedInfo] = useState<boolean>(false);

  const { user } = userStore;

  const { isLoading: isLoadingContext } = useContext(LoadingContext);

  const getRestaurants = useCallback(async () => getPopularRestaurants(), []);

  const getPinnedRestaurants = useCallback(
    async (restaurantIds: number[]) => checkPinnedRestaurantList({ userId: user.id, restaurantIds }),
    [user.id],
  );

  useEffect(() => {
    setIsLoadingItems(true);
    getRestaurants()
      .then((response) => setItems(response.data.data))
      .finally(() => setIsLoadingItems(false));
  }, [getRestaurants]);

  useEffect(() => {
    if (!items || !items.length || !user.id) {
      return;
    }

    setIsLoadingPinnedInfo(true);
    getPinnedRestaurants(items.map((item) => item.id))
      .then((response) => setPinnedRestaurants(response.data.data.filter((item) => item.pinned).map((item) => item.id)))
      .finally(() => setIsLoadingPinnedInfo(false));
  }, [getPinnedRestaurants, items, user.id]);

  const isLoading = isLoadingItems || isLoadingPinnedInfo || isLoadingContext;

  return (
    <div className={s["popular-list"]}>
      {isLoading && <Spin fullscreen size="large" />}
      <Title font="playfair-display" size="lg" className={s["popular-list__title"]}>
        Список популярных мест
      </Title>
      <div className={s["popular-list__content"]}>
        {items.map((item) => (
          <RestaurantMiniCard
            key={item.id}
            restaurantInfo={item}
            isAddedToFavourite={pinnedRestaurants.includes(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default observer(PopularList);
