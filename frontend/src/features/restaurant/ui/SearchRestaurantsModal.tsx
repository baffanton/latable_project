import { RestaurantModel } from "@entities/Restaurant/model/types";
import { FC, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDebounce } from "@shared/hooks/useDebounce";
import { getRestaurants } from "../../../entities/Restaurant/api/endpoints";
import { defaultFilterRequest } from "@shared/ui/Filter/model/Filter.const";
import { defaultPagination } from "@shared/ui/Pagination/model/Pagination.const";
import { Modal } from "@shared/ui/Modal";
import { Input } from "@shared/ui/Input";
import { SearchOutlined } from "@ant-design/icons";
import s from "./styles/SearchRestaurantsModal.module.scss";
import { Button } from "@shared/ui/Button";
import { RestaurantBanner } from "@entities/Restaurant/ui/RestaurantBanner";
import { NotFound } from "@shared/ui/NotFound/ui/NotFound";
import { Spin } from "@shared/ui/Spin";

interface SearchRestaurantsModalProps {
  setIsOpenModal: (value: boolean) => void;
}

const SearchRestaurantsModal: FC<SearchRestaurantsModalProps> = ({ setIsOpenModal }) => {
  const [restRows, setRestRows] = useState<RestaurantModel[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isShowNotFound, setIsShowNotFound] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onSearchHandler = useDebounce(async (searchedValue: string) => {
    if (searchedValue === "") {
      setRestRows([]);
      setTotal(0);

      return;
    }

    setIsLoading(true);

    await getRestaurants({
      ...defaultFilterRequest,
      searchValue: searchedValue,
      pagination: { ...defaultPagination, limit: 5 },
    }).then((response) => {
      const { data, total: totalFromResponse } = response.data;

      setRestRows(data);
      setTotal(totalFromResponse);
      setIsShowNotFound(totalFromResponse === 0);
      // TODO: обернуть в finally
      setIsLoading(false);
    });
  });

  const onChange = (e: any) => {
    onSearchHandler(e.target.value);
    setSearchValue(e.target.value);
  };

  const onShowMoreClickHandler = () => {
    setIsOpenModal(false);
    navigate({
      pathname: "/restaurant-list",
      search: createSearchParams({ search: searchValue }).toString(),
    });
  };

  const isShowMoreButton = total > 5;

  return (
    <Modal
      open
      destroyOnClose
      className={s["search-restaurants-modal"]}
      footer={null}
      onCancel={() => setIsOpenModal(false)}
      closeIcon={null}
    >
      <Input
        className={s["search-restaurants-modal__search"]}
        suffix={<SearchOutlined />}
        placeholder="Введите название"
        onChange={onChange}
      />
      <div className={s["search-restaurants-modal__items"]}>
        {restRows.map((restaurant, index) => (
          <RestaurantBanner
            key={restaurant.id}
            restaurantData={restaurant}
            index={index}
            setIsOpenModal={setIsOpenModal}
          />
        ))}
        {isShowNotFound && <NotFound />}
        {isShowMoreButton && (
          <Button type="text" onClick={onShowMoreClickHandler}>
            Показать ещё
          </Button>
        )}
      </div>
      {isLoading && <Spin transparent />}
    </Modal>
  );
};

export default SearchRestaurantsModal;
