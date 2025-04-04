"use client"

import * as React from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, XIcon, GithubIcon, LinkedinIcon } from "../icons";
import { MenuIcon } from "../icons";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

const Header = () => {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="flex items-center justify-between p-4">
      <h1 className="text-2xl">Harmony</h1>
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger className="px-4 py-2 rounded-md border-[1px] border-accent-foreground/50" >
            <MenuIcon className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full">
              <nav className="flex flex-col items-start gap-6 mt-auto mb-auto">
                <Link href="/" className="text-xl relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                  Home
                </Link>
                <Link href="/dashboard" className="text-xl relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                  Dashboard
                </Link>
              </nav>
              <div className="flex justify-start gap-4 text-accent-foreground w-full mt-6 mb-4">
                <Link href="https://twitter.com" className="text-lg relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                  <XIcon className="h-5 w-5" />
                </Link>
                <Link href="https://github.com" className="text-lg relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                  <GithubIcon className="h-5 w-5" />
                </Link>
                <Link href="https://linkedin.com" className="text-lg relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                  <LinkedinIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;