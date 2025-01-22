import { LoadingContext } from "@shared/context/LoadingContext";
import { FC, ReactElement, useState } from "react";

interface LoadingProviderProps {
  children: ReactElement;
}

const LoadingProvider: FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return <LoadingContext.Provider value={{ isLoading, setIsLoading }}>{children}</LoadingContext.Provider>;
};

export { LoadingProvider };
