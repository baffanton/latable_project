import { RestaurantModel } from "@entities/Restaurant/model/types";
import { FilterItemModel, FilterModeType, FilterValueTypes } from "@shared/ui/Filter/model/Filter.types";
import { defaultPagination } from "@shared/ui/Pagination/model/Pagination.const";
import { PaginationModel } from "@shared/ui/Pagination/model/Pagination.types";
import { FC, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { filtersConfig } from "../model/filtersConfig";
import { getRestaurants } from "@entities/Restaurant/api/endpoints";
import s from "./RestaurantList.module.scss";
import { RestaurantListFilterTypes } from "../model/RestaurantList.types";
import { Input } from "@shared/ui/Input";
import { CheckOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import RestaurantMiniCard from "@entities/Restaurant/ui/RestaurantMiniCard";
import { Tooltip } from "antd";
import { Title } from "@shared/ui/Title";
import { Spin } from "@shared/ui/Spin";
import { useDebounce } from "@shared/hooks/useDebounce";
import { NotFound } from "@shared/ui/NotFound/ui/NotFound";
import { Pagination } from "@shared/ui/Pagination";
import { Filter } from "@shared/ui/Filter";
import userStore from "@app/stores/UserStore";
import { checkPinnedRestaurantList } from "@entities/User/api/endpoints";

const RestaurantList: FC = () => {
  const [filters, setFilters] = useState<FilterItemModel[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [defaultFilters, setDefaultFilters] = useState<FilterItemModel[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationModel>(defaultPagination);

  const [restaurants, setRestaurants] = useState<RestaurantModel[]>([]);
  const [pinnedRestaurantIds, setPinnedRestaurantIds] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isEmptyData, setIsEmptyData] = useState<boolean>(false);

  const [countLoadingItems, setCountLoadingItems] = useState<number>(0);
  const startLoading = () => setCountLoadingItems((prev) => prev + 1);
  const stopLoading = () => setCountLoadingItems((prev) => prev - 1);

  const [searchParams] = useSearchParams();

  const { user } = userStore;

  const config = useMemo(
    () =>
      filtersConfig.map((filterItem) =>
        filterItem.key === "establishmentType" && searchParams.get("establishmentType")
          ? { ...filterItem, defaultValue: [Number(searchParams.get("establishmentType"))] }
          : filterItem,
      ),
    [searchParams],
  );

  useEffect(() => {
    const searchValueFromParams = searchParams.get("search");

    if (searchValueFromParams) {
      setSearchValue(searchValueFromParams);
    }
  }, [searchParams]);

  useEffect(() => {
    const defaultValues: FilterItemModel[] = config
      .filter((item) => item.defaultValue)
      .map((item) => ({ field: item.key, mode: item.filterMode, value: item.defaultValue as FilterValueTypes }));

    setDefaultFilters(defaultValues);
    setFilters(defaultValues);
  }, [config]);

  useEffect(() => {
    if (!restaurants || !restaurants.length || !user.id) {
      return;
    }

    const getPinnedRestaurants = async (restaurantIds: number[]) =>
      checkPinnedRestaurantList({ userId: user.id, restaurantIds });

    startLoading();
    getPinnedRestaurants(restaurants.map((item) => item.id))
      .then((response) =>
        setPinnedRestaurantIds(response.data.data.filter((item) => item.pinned).map((item) => item.id)),
      )
      .finally(() => stopLoading());
  }, [restaurants, user.id]);

  const getItems = useDebounce(async (requestFilters?: FilterItemModel[]) => {
    startLoading();

    try {
      const response = await getRestaurants({
        searchValue,
        filters: requestFilters || filters,
        pagination: paginationData,
      });

      const { data, total } = response.data;

      setRestaurants(data);
      setTotal(total);
      setIsEmptyData(total === 0);
    } finally {
      stopLoading();
      onScrollToTopHandler();
    }
  });

  useEffect(() => {
    getItems();
  }, [searchValue, defaultFilters, paginationData]);

  const onChangeFilterHandler = (filterName: string, filterMode: FilterModeType, newValue: FilterValueTypes) => {
    const currentValue = filters.find((filter) => filter.field === filterName);

    if (currentValue) {
      setFilters(filters.map((filter) => (filter.field === filterName ? { ...filter, value: newValue } : filter)));
      return;
    }

    setFilters([...filters, { field: filterName, mode: filterMode, value: newValue }]);
  };

  const onChangeSearchHandler = (e: any) => {
    setSearchValue(e.target.value);
  };

  const onClearFiltersHandler = () => {
    setFilters(defaultFilters);
    setSearchValue("");
    getItems(defaultFilters);
  };

  const onScrollToTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onChangePaginationHandler = (offset: number, limit: number) => {
    setPaginationData({ offset, limit });
  };

  const onApplyFiltersClickHandler = () => getItems();

  return (
    <div className={s["restaurant-list"]}>
      {countLoadingItems !== 0 && <Spin fullscreen size="large" />}
      <Title font="playfair-display" size="lg" className={s["restaurant-list__title"]}>
        Список ресторанов
      </Title>
      <div className={s["restaurant-list__search-container"]}>
        <Input
          suffix={<SearchOutlined />}
          placeholder="Введите название"
          onChange={onChangeSearchHandler}
          value={searchValue}
        />
      </div>
      <div className={s["restaurant-list__filters-container"]}>
        <div className={s["restaurant-list__filters"]}>
          {config.map((filter) => (
            <Filter<RestaurantListFilterTypes>
              key={filter.key}
              filter={filter}
              onChange={onChangeFilterHandler}
              startLoading={startLoading}
              stopLoading={stopLoading}
            />
          ))}
        </div>
        <div className={s["restaurant-list__buttons"]}>
          <Tooltip title="Применить фильтры">
            <CheckOutlined className={s["restaurant-list__apply"]} onClick={onApplyFiltersClickHandler} />
          </Tooltip>
          <Tooltip title="Отчистить фильтры">
            <DeleteOutlined className={s["restaurant-list__delete"]} onClick={onClearFiltersHandler} />
          </Tooltip>
        </div>
      </div>
      <div className={s["restaurant-list__content"]}>
        {isEmptyData ? (
          <NotFound />
        ) : (
          <div className={s["restaurant-list__items"]}>
            {restaurants.map((restInfo) => (
              <RestaurantMiniCard
                key={restInfo.id}
                restaurantInfo={restInfo}
                isAddedToFavourite={pinnedRestaurantIds.includes(restInfo.id)}
              />
            ))}
          </div>
        )}
        {!!restaurants.length && <Pagination total={total} onChange={onChangePaginationHandler} />}
      </div>
    </div>
  );
};

export default RestaurantList;
