import supabase from "@/lib/supabase";
import { constructFileURL, getFilePath, getNodeFileInfo } from "..";

const NODE_IMAGES_FOLDER = "node_images";

export async function editNodeImage(prevURL: string, image: File) {
  const { userID, fileName, fileExtension } = getNodeFileInfo(prevURL);
  const { path, url } = constructFileURL({
    usrID: userID,
    ext: fileExtension,
    fileName: fileName,
    folder: NODE_IMAGES_FOLDER,
  });
  await supabase.storage.from(NODE_IMAGES_FOLDER).update(path, image);
  return url;
}

export async function uploadNodeImage(image: File) {
  const file = await getFilePath(image, NODE_IMAGES_FOLDER);
  if(!file) return 
  const { path, url } = file 
  await supabase.storage.from(NODE_IMAGES_FOLDER).upload(path, image);
  return url;
}
