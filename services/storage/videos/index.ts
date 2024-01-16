import supabase from "@/lib/supabase";
import { constructFileURL, getFilePath, getNodeFileInfo } from "..";

const NODE_VIDEOS_FOLDER = "node_videos";

export async function editNodeVideo(prevURL: string, video: File) {
  const { userID, fileName, fileExtension } = getNodeFileInfo(prevURL);
  const { url, path } = constructFileURL({
    usrID: userID,
    ext: fileExtension,
    fileName: fileName,
    folder: NODE_VIDEOS_FOLDER,
  });
  await supabase.storage.from(NODE_VIDEOS_FOLDER).update(path, video);
  return url;
}

export async function uploadNodeVideo(video: File) {
  const file = await getFilePath(video, NODE_VIDEOS_FOLDER);
  if(!file) return 
  const { path, url } = file
  await supabase.storage.from(NODE_VIDEOS_FOLDER).upload(path, video);
  return url;
}
