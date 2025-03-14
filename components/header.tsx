"use client"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="px-6 py-4 flex flex-row justify-between items-center">
      <span className="text-xl">Harmony</span>
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
    </div>
  );
}
