"use client"

import * as React from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, XIcon, GithubIcon, LinkedinIcon } from "../icons";
import { MenuIcon } from "../icons";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleLinkClick = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <header className="flex items-center justify-between p-4">
      <h1 className="text-2xl">Harmony</h1>
      <div className="flex items-center gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="px-4 py-2 rounded-md border-[1px] border-accent-foreground/50 cursor-pointer" >
            <MenuIcon className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full">
              <nav className="flex flex-col items-start gap-6 mt-auto mb-auto">
                <button onClick={() => handleLinkClick("/")} className="text-xl relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full cursor-pointer">
                  Home
                </button>
                <button onClick={() => handleLinkClick("/dashboard")} className="text-xl relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full cursor-pointer">
                  Dashboard
                </button>
              </nav>
              <div className="flex justify-start gap-4 text-accent-foreground w-full mt-6 mb-4">
                <Link href="https://twitter.com" className="text-lg cursor-pointer">
                  <XIcon className="h-5 w-5" />
                </Link>
                <Link href="https://github.com" className="text-lg cursor-pointer">
                  <GithubIcon className="h-5 w-5" />
                </Link>
                <Link href="https://linkedin.com" className="text-lg cursor-pointer">
                  <LinkedinIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="cursor-pointer"
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