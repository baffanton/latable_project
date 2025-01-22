export type LoginModalTypes = "authorization" | "registration" | "recovery-password";

export interface LoadingContextModel {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}
