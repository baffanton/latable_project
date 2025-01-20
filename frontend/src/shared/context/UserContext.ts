import { UserStore } from "@app/stores/UserStore";
import { createContext } from "react";

export const userStore = new UserStore();

export const UserContext = createContext(userStore);
