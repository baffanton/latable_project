import { LoadingContextModel } from "@app/providers/LoadingProvider/model/types";
import { createContext } from "react";

export const LoadingContext = createContext<LoadingContextModel>({
  isLoading: false,
  setIsLoading: () => null,
});
