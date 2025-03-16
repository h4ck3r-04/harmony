"use client"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SunIcon, MoonIcon, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "./ui/sheet";
import { motion } from "framer-motion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import FadeContent from "./ui/fade-content";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!mounted) return null;

  return (
    <div className="px-6 py-4 flex flex-row justify-between items-center">
      <span className="text-xl">Harmony</span>
      <div className="flex flex-row items-center space-x-2 ">
        <Button className="hidden md:flex" variant="outline" asChild>
          <Link href="/">Get Started</Link>
        </Button>
        <Button className="hidden md:flex" variant="outline" asChild>
          <Link href="/">Login</Link>
        </Button>
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
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
                { href: "/integrations", label: "Integrations" },
                { href: "https://github.com/h4ck3r-04/harmony", label: "Github" },
              ].map(({ href, label }) => (
                <FadeContent key={href} blur={true} duration={500} easing="ease-out" initialOpacity={0}>
                  <Link href={href} className="relative text-lg group" onClick={() => setIsOpen(false)}>
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
