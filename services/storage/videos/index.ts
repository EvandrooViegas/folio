import supabase from "@/lib/supabase";
import env from "@/services/env";
import { getAuthedUser } from "@/services/user";
import { getFilePath, getNodeFileInfo } from "..";

const NODE_VIDEOS_FOLDER = "node_videos";
const CDN_URL = `${env.supabaseUrl}/storage/v1/object/public`;
const BUCKET_URL = `${CDN_URL}/${NODE_VIDEOS_FOLDER}`;


export async function editNodeVideo(url: string, image: File) {
  const { userID, imageName, imageExtension } = getNodeFileInfo(url)
  await supabase.storage.from(NODE_VIDEOS_FOLDER).update(getFilePath({
    imgExt: imageExtension,
    imgName: imageName,
    userID,
  }), image)
}


export async function uploadNodeVideo(video: File) {
  const ext = (video?.name as string).split(".")[1];
  const user = await getAuthedUser();
  if (!user) return;
  const name = `${user.id}/${crypto.randomUUID()}.${ext}`;
  const { data } = await supabase.storage
    .from(NODE_VIDEOS_FOLDER)
    .upload(name, video);

  return `${BUCKET_URL}/${name}`;
}



