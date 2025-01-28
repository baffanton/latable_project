import { Radio, RadioChangeEvent, Space } from "antd";
import { FilterItemProps } from "../model/Filter.types";

interface FilterRadioProps<T> extends FilterItemProps<T> {}

const FilterRadio = <T,>({ filterName, onChange, currentValue, options }: FilterRadioProps<T>) => {
  const onChangeRadioHandler = (e: RadioChangeEvent) => {
    onChange(e.target.value);
  };

  return (
    <>
      <Radio.Group onChange={onChangeRadioHandler} name={filterName as string} value={currentValue}>
        <Space direction="vertical">
          {options.map((option) => (
            <Radio key={`${filterName}_${option.value}`} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </>
  );
};

export { FilterRadio };
