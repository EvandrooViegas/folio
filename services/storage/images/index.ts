import supabase from "@/lib/supabase";
import { getAuthedUserID } from "@/services/user";
import { CDN_URL, getFilePath, getNodeFileInfo } from "..";

const NODE_IMAGES_FOLDER = "node_images";
const BUCKET_URL = `${CDN_URL}/${NODE_IMAGES_FOLDER}`;


export async function uploadNodeImage(image: File) {
  const ext = (image?.name as string).split(".")[1];
  const id = await getAuthedUserID();
  const { data } = await supabase.storage
    .from(NODE_IMAGES_FOLDER)
    .upload(getFilePath({ imgExt: ext, imgName: crypto.randomUUID(), userID: id }), image);
  const path = data?.path;
  if (!path) return;

  return `${BUCKET_URL}/${name}`;
}

export async function editNodeImage(url: string, image: File) {
  const { userID, imageName, imageExtension } = getNodeFileInfo(url)
  await supabase.storage.from(NODE_IMAGES_FOLDER).update(getFilePath({
    imgExt: imageExtension,
    imgName: imageName,
    userID,
  }), image)
}

export async function removeNodeImages(paths: string[]) {
  if(paths.length <= 0) return 
  await supabase.storage
    .from(NODE_IMAGES_FOLDER)
    .remove(paths);
}

