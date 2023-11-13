import { getAuthedUser } from "@/services/user";
import Image from "next/image";
import React from "react";

export default async function Sidebar() {
  const user = await getAuthedUser();

  return (
    <nav className="flex flex-col items-center p-6 border-r border-dashed border-neutral-200 h-screen">
      <div className=" flex justify-between items-center gap-2">
        <Image
          src={user?.profile_avatar || ""}
          className="rounded-full"
          width={50}
          height={50}
          alt="Profile pic"
        />
        <span className="font-black text-neutral-600 ">
          @{user?.username}
        </span>
      </div>
      <ul></ul>
    </nav>
  );
}
