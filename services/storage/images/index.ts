import supabase from "@/lib/supabase";
import { CDN_URL, constructFileURL, getFilePath, getNodeFileInfo } from "..";

const NODE_IMAGES_FOLDER = "node_images";
const BUCKET_URL = `${CDN_URL}/${NODE_IMAGES_FOLDER}`;


export async function editNodeImage(prevURL: string, image: File) {
  const { userID, fileName, fileExtension } = getNodeFileInfo(prevURL);
  const url = constructFileURL({
    usrID: userID,
    ext: fileExtension,
    fileName: fileName,
  })
  const res = await supabase.storage
    .from(NODE_IMAGES_FOLDER)
    .update(
      url,
      image
    );
    return url
}


export async function uploadNodeImage(image: File) {
  const path = await getFilePath(image)
  await supabase.storage
    .from(NODE_IMAGES_FOLDER)
    .upload(path, image);
  return `${BUCKET_URL}/${path}`;
}


export async function removeNodeImages(paths: string[]) {
  if(paths.length <= 0) return 
  await supabase.storage
    .from(NODE_IMAGES_FOLDER)
    .remove(paths);
}

