import { getUserByID } from "@/services/user";
import Image from "next/image";
import React from "react";

type Props = {
  params: { id: string };
};
export default async function page(props: Props) {
  const {
    params: { id },
  } = props;
  const user = await getUserByID(id);
  return (
    <div className="flex items-center  gap-2">
      <Image width={200} height={200} className="object-cover rounded-full" src={user?.profile_avatar} />
      <span className="text-3xl font-bold text-dimmed">@{user?.username}</span>
    </div>
  );
}
