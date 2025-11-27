import { useState } from "react";

import { CurrentUserContext } from "@/hooks/contexts/current-user-context";
import type { User } from "@/interfaces/user";

export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
