import supabase from "@/lib/supabase";
import env from "@/services/env";
import { getFilePath } from "..";

const NODE_VIDEOS_FOLDER = "node_videos";
const CDN_URL = `${env.supabaseUrl}/storage/v1/object/public`;
const BUCKET_URL = `${CDN_URL}/${NODE_VIDEOS_FOLDER}`;


export async function editNodeVideo(image: File) {
  const path = await getFilePath(image)
  await supabase.storage.from(NODE_VIDEOS_FOLDER).update(path, image)
}


export async function uploadNodeVideo(video: File) {
  const path = await getFilePath(video)
  await supabase.storage
    .from(NODE_VIDEOS_FOLDER)
    .upload(path, video);

  return `${BUCKET_URL}/${path}`;
}



