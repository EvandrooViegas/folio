import supabase from "@/lib/supabase";
import env from "@/services/env";
import { getAuthedUser } from "@/services/user";

const NODE_IMAGES_FOLDER = "node_images";
const CDN_URL = `${env.supabaseUrl}/storage/v1/object/public`;
const BUCKET_URL = `${CDN_URL}/${NODE_IMAGES_FOLDER}`;

export async function uploadNodeImage(image: File) {
  const ext = (image?.name as string).split(".")[1];
  const user = await getAuthedUser();
  if (!user) return;
  const name = `${user.id}/${crypto.randomUUID()}.${ext}`;
  const { data } = await supabase.storage
    .from(NODE_IMAGES_FOLDER)
    .upload(name, image);

  const path = data?.path;
  if (!path) return;

  return `${BUCKET_URL}/${name}`;
}

export async function removeNodeImages(paths: string[]) {
  if(paths.length <= 0) return 
  await supabase.storage
    .from(NODE_IMAGES_FOLDER)
    .remove(paths);
}
export function getNodeImageInfo(imageURL: string) {
  const url = imageURL.split(CDN_URL + "/")[1];
  const [buckedName, userID, image] = url.split("/");
  const [imageName, imageExtension] = image.split(".");
  const path = `${userID}/${imageName}.${imageExtension}`;
  return { buckedName, userID, image, imageName, imageExtension, path };
}

