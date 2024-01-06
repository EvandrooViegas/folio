import supabase from "@/lib/supabase";
import { getAuthedUserID } from "@/services/user";
import { CDN_URL, getFilePath, getNodeFileInfo } from "..";

const NODE_IMAGES_FOLDER = "node_images";
const BUCKET_URL = `${CDN_URL}/${NODE_IMAGES_FOLDER}`;


export async function uploadNodeImage(image: File) {
  const path = await getFilePath(image)
  await supabase.storage
    .from(NODE_IMAGES_FOLDER)
    .upload(path, image);
  return `${BUCKET_URL}/${path}`;
}

export async function editNodeImage(image: File) {
  const path = await getFilePath(image)
  await supabase.storage.from(NODE_IMAGES_FOLDER).update(path, image)
}

export async function removeNodeImages(paths: string[]) {
  if(paths.length <= 0) return 
  await supabase.storage
    .from(NODE_IMAGES_FOLDER)
    .remove(paths);
}

