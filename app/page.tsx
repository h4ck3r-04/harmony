"use client"
import { useTheme } from "next-themes"

export default function Home() {
  const { setTheme } = useTheme();
  return (
    <div className="flex flex-col space-y-2 w-full h-screen items-center justify-center">
      <button onClick={() => setTheme("light")}>light</button>
      <button onClick={() => setTheme("dark")}>dark</button>
    </div>
  )
}
