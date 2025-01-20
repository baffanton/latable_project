import { ReactNode, useEffect } from "react";
import { UserContext, userStore } from "@shared/context/UserContext";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = (props: UserProviderProps) => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth();
    }
  }, []);

  return <UserContext.Provider value={userStore}>{props.children}</UserContext.Provider>;
};

export { UserProvider };
