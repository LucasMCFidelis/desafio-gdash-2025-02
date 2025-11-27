import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";

import type { User } from "@/interfaces/user";

interface CurrentUserContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const CurrentUserContext = createContext({} as CurrentUserContextProps);

export const useCurrentUserContext = () => {
  const context = useContext(CurrentUserContext);

  if (!context) throw new Error("Current User Provider not found");

  return context;
};
