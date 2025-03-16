import { Poppins } from "next/font/google";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ThemeProvider } from "next-themes";
import Menu from "@/components/menu";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Harmony",
  description: "Data Made Beautiful.",
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-[95vh] flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <div className="w-full flex justify-between items-center px-6 py-2 text-sm">
                <Link href={"/"} className="text-xl">Harmony</Link>
                <div className="flex flex-row items-center space-x-2">
                  <HeaderAuth />
                  <ThemeSwitcher />
                  <Menu />
                </div>
              </div>
              <div className="flex flex-col">
                {children}
              </div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
