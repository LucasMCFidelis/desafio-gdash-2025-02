import { useNavigate } from "@tanstack/react-router";
import {
  type ButtonHTMLAttributes, memo
} from "react";

import { useCurrentUserContext } from "@/hooks/contexts/current-user-context";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import ThemeToggle from "./theme-toggle";

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  textContent: string;
}

const HeaderButton = ({
  onClick,
  textContent,
  className,
}: HeaderButtonProps) => {
  return (
    <Button
      variant={"link"}
      name={textContent.toLowerCase()}
      onClick={onClick}
      className={cn("font-bold", className)}
    >
      {textContent}
    </Button>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const { user } = useCurrentUserContext();

  return (
    <header className="flex justify-between py-4 px-6 bg-card border-b-2 shadow-md">
      <div className="flex">
        <HeaderButton
          textContent="Inicio"
          onClick={() => navigate({ href: "/" })}
        />
        <HeaderButton
          textContent="Insights"
          onClick={() => navigate({ href: "/insights" })}
        />
      </div>
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
