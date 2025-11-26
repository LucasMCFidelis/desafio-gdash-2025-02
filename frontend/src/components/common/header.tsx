import { useNavigate } from "@tanstack/react-router";
import { memo } from "react";

import { Button } from "../ui/button";
import ThemeToggle from "./theme-toggle";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between py-4 px-6 bg-card border-b-2 shadow-md ">
      <Button variant={"link"} onClick={() => navigate({ href: "/" })} className="font-bold">Inicio</Button>
      <ThemeToggle />
    </header>
  );
};

export default memo(Header);
