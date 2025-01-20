import { LoadingContextModel } from "@shared/types/LoadingContextModel";
import { createContext } from "react";

export const LoadingContext = createContext<LoadingContextModel>({
  isLoading: false,
  setIsLoading: () => null,
});
