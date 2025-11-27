"use client";

import { Moon, Sun } from "lucide-react";

import { useThemeContext } from "@/hooks/contexts/theme-context";

import { Button } from "../ui/button";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <Button
      onClick={toggleTheme}
      name="toggle-theme"
      aria-label="toggle-theme"
      size={"icon"}
      variant={"outline"}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </Button>
  );
}
