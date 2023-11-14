

import supabase from "@/lib/supabase";
import env from "@/services/env";
import { getAuthedUser } from "@/services/user";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const NODE_IMAGES_FOLDER = "node_images";
const CDN_URL = `${env.supabaseUrl}/storage/v1/object/public/${NODE_IMAGES_FOLDER}`;

export async function uploadNodeImage(image: File) {
  const ext = (image?.name as string).split(".")[1];
  const user = await getAuthedUser();
  if (!user) return;
  const name = `${user.id}/${crypto.randomUUID()}.${ext}`;
  const { data } = await supabase.storage
    .from("node_images")
    .upload(name, image);

  const path = data?.path;
  if (!path) return;

  return `${CDN_URL}/${name}`;
}
