import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await currentUser();
  console.log(user);

  if (!user) {
    redirect('/');
  }
  return (
    <div className="text-white"></div>
  )
}