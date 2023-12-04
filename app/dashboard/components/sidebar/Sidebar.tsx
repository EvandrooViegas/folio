import Icon from "@/components/ui/Icon";
import { getAuthedUser } from "@/services/user";
import Image from "next/image";
import React, { Suspense } from "react";
import FoliosList from "./FoliosList";
import FoliosListSkeleton from "./FoliosListSkeleton";

export default async function Sidebar() {
  const user = await getAuthedUser();

  return (
    <nav className="h-screen group flex flex-col items-center p-4 gap-6 border-r border-dashed border-neutral-200 ">
      <div className="flex items-center gap-2">
        <div className=" relative w-14 h-14">
          <Image
            src={user?.profile_avatar || ""}
            className="rounded-full bg-black"
            alt="Profile pic"
            fill
          />
        </div>
        <span className="font-black text-neutral-600">@{user?.username}</span>
      </div>
      <ul className="self-start w-full">
        <li>
          <div className="flex items-center gap-1 text-sm font-bold text-dimmed">
            <span>
              <Icon name="folio" />
            </span>
            <span>Folios</span>
          </div>


          <Suspense fallback={<FoliosListSkeleton />}>
            <FoliosList />
          </Suspense>
 
        </li>
      </ul>
    </nav>
  );
}
