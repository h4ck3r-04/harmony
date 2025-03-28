"use client"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SunIcon, MoonIcon, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "./ui/sheet";
import { motion } from "framer-motion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import FadeContent from "./ui/fade-content";

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
      <div className="flex flex-row items-center space-x-2 ">
        <SignedOut>
          <Button className="flex" variant="outline" asChild>
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <Button className="flex" variant="outline" asChild>
            <UserButton />
          </Button>
        </SignedIn>
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
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="w-6 h-6 text-muted-foreground" />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start justify-center h-full">
            <SheetTitle>
              <VisuallyHidden>Menu</VisuallyHidden>
            </SheetTitle>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col space-y-4 text-left"
            >
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "https://github.com/h4ck3r-04/harmony", label: "Github" },
              ].map(({ href, label }) => (
                <FadeContent key={href} blur={true} duration={500} easing="ease-out" initialOpacity={0}>
                  <Link href={href} className="relative text-lg group">
                    {label}
                  </Link>
                </FadeContent>
              ))}
            </motion.div>

          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}