import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import { FC, ReactNode } from "react";

interface AntdConfigProviderProps {
  children: ReactNode;
}

const AntdConfigProvider: FC<AntdConfigProviderProps> = ({ children }) => (
  <ConfigProvider locale={ruRU}>{children}</ConfigProvider>
);

export { AntdConfigProvider };
