import supabase from "@/lib/supabase";
import env from "@/services/env";
import { constructFileURL, getFilePath, getNodeFileInfo } from "..";

const NODE_VIDEOS_FOLDER = "node_videos";
const CDN_URL = `${env.supabaseUrl}/storage/v1/object/public`;
const BUCKET_URL = `${CDN_URL}/${NODE_VIDEOS_FOLDER}`;

export async function editNodeVideo(prevURL: string, video: File) {
  const { userID, fileName, fileExtension } = getNodeFileInfo(prevURL);
  const url = constructFileURL({
    usrID: userID,
    ext: fileExtension,
    fileName: fileName,
  })
  const res = await supabase.storage
    .from(NODE_VIDEOS_FOLDER)
    .update(
      url,
      video
    );
    console.log(res)
    return url
      
}

export async function uploadNodeVideo(video: File) {
  const path = await getFilePath(video);
  await supabase.storage.from(NODE_VIDEOS_FOLDER).upload(path, video);

  return `${BUCKET_URL}/${path}`;
}
