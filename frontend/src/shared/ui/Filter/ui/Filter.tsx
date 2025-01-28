import { useEffect, useRef, useState } from "react";
import { FilterModel, FilterModeType, FilterValueTypes } from "../model/Filter.types";
import { Option } from "@shared/types/Option";
import { FilterCheckbox } from "./FilterCheckbox";
import { FilterRadio } from "./FilterRadio";
import { Text } from "@shared/ui/Text";
import s from "./styles/Filter.module.scss";
import cn from "classnames";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

interface FilterProps<T> {
  filter: FilterModel<T>;
  onChange: (filterName: T, filterMode: FilterModeType, newValue: FilterValueTypes) => void;
  stopLoading: () => void;
  startLoading: () => void;
}

const Filter = <T,>({ filter, onChange, stopLoading, startLoading }: FilterProps<T>) => {
  const { key, title, filterType, filterMode, dataSource, defaultValue } = filter;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<FilterValueTypes | undefined>(defaultValue);
  const [options, setOptions] = useState<Option[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  const getOptions = async () => {
    try {
      startLoading();

      const response = await dataSource();
      const { data } = response;

      setOptions(data);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    getOptions();
  }, [dataSource]);

  useEffect(() => {
    if (options && defaultValue && options.find((option) => option.value === defaultValue)) {
      setCurrentValue(defaultValue);
    }
  }, [options]);

  useEffect(() => {
    setCurrentValue(defaultValue);
  }, []);

  const onClickOutsideHandler = (event: MouseEvent) => {
    if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", onClickOutsideHandler);

    return () => {
      document.removeEventListener("mousedown", onClickOutsideHandler);
    };
  }, []);

  const onHeaderClickHandler = () => {
    setIsOpen(!isOpen);
  };

  const onChangeFilterHandler = (values: any) => {
    setCurrentValue(values);
    onChange(key, filterMode, values);
  };

  const getFilterItem = () => {
    switch (filterType) {
      case "checkbox":
        return (
          <FilterCheckbox
            options={options}
            filterName={key}
            onChange={onChangeFilterHandler}
            currentValue={currentValue}
          />
        );
      case "radio":
        return (
          <FilterRadio
            options={options}
            filterName={key}
            onChange={onChangeFilterHandler}
            currentValue={currentValue}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div ref={ref} className={cn(s["filter"], { [s["filter_open"]]: isOpen })}>
      <div className={s["filter__header"]} onClick={onHeaderClickHandler}>
        <Text className={s["filter__title"]} size="sm" font="playfair-display">
          {title}
        </Text>
        {isOpen ? (
          <CaretUpOutlined className={s["filter__dropdown-icon"]} />
        ) : (
          <CaretDownOutlined className={s["filter__dropdown-icon"]} />
        )}
      </div>
      {isOpen && <div className={s["filter__content"]}>{getFilterItem()}</div>}
    </div>
  );
};

export { Filter };
