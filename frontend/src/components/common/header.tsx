import { useNavigate } from "@tanstack/react-router";
import { memo } from "react";

import { useCurrentUserContext } from "@/hooks/contexts/current-user-context";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import ThemeToggle from "./theme-toggle";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useCurrentUserContext();
  return (
    <header className="flex justify-between py-4 px-6 bg-card border-b-2 shadow-md">
      <Button
        variant={"link"}
        onClick={() => navigate({ href: "/" })}
        className="font-bold"
      >
        Inicio
      </Button>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {user ? (
          <Avatar
            onClick={() => navigate({ href: "/profile" })}
            className="hover:cursor-pointer"
          >
            <AvatarFallback className="uppercase font-bold">
              {user.name.split(" ")?.[0]?.[0]}
              {user.name.split(" ")?.[1]?.[0]}
            </AvatarFallback>
          </Avatar>
        ) : (
          <Button onClick={() => navigate({ href: "/auth" })}>Login</Button>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
