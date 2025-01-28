import { Checkbox, Space } from "antd";
import { FilterItemProps, FilterValueTypes } from "../model/Filter.types";

interface FilterCheckboxProps<T> extends FilterItemProps<T> {}

const FilterCheckbox = <T,>({ filterName, onChange, currentValue, options }: FilterCheckboxProps<T>) => {
  const onChangeHandler = (checkedValue: FilterValueTypes) => {
    onChange(checkedValue);
  };

  return (
    <>
      <Checkbox.Group name={filterName as string} onChange={onChangeHandler} value={currentValue as any}>
        <Space direction="vertical">
          {options.map((option) => (
            <Checkbox key={`${filterName}_${option.value}`} value={option.value}>
              {option.label}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    </>
  );
};

export { FilterCheckbox };
