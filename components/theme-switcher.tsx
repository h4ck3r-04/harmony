"use client";
import { SunIcon, MoonIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <SunIcon className="w-6 h-6 text-muted-foreground" />
      ) : (
        <MoonIcon className="w-6 h-6 text-muted-foreground" />
      )}
    </Button>
  );
};

export { ThemeSwitcher };
