import supabase from "@/lib/supabase";
import env from "../env";

export const CDN_URL = `${env.supabaseUrl}/storage/v1/object/public`;

export type Folders = "video" | "gallery"

export async function getFilePath(video: File, folder: string, folioID: string) {
  const ext = (video?.name as string).split(".")[1];
  return constructFileURL({
    ext,
    fileName: crypto.randomUUID(),
    folioID,
    folder,
  });
}

export function constructFileURL({
  folioID,
  fileName,
  ext,
  folder,
}: {
  folioID: string;
  fileName: string;
  ext: string;
  folder: string;
}) {
  const path = `folios/${folder}/${folioID}/${fileName}.${ext}`;
  const url = `${CDN_URL}/${path}`;
  return { url, path };
}

export function getNodeFileInfo(fileURL: string) {
  const url = fileURL.split(CDN_URL + "/")[1];
  const [bucketName ,folioID, file] = url.split("/");
  const [fileName, fileExtension] = file.split(".");
  const path = `${folioID}/${fileName}.${fileExtension}`;
  return { folioID, file, fileName, fileExtension, path, bucketName };
}

export async function deleteFolioMedia(ID: string) {
  return await supabase.storage.deleteBucket(ID)
}

export async function editNodeMedia(video: File, folder: Folders, prevURL: string) {
  const {  fileName, fileExtension, folioID } = getNodeFileInfo(prevURL);
  const { url, path } = constructFileURL({
    ext: fileExtension,
    fileName: fileName,
    folder,
    folioID
  });
  await supabase.storage.from(folder).update(path, video);
  return url;
}

export async function uploadNodeMedia(video: File, folder: Folders, folioID: string) {
  const file = await getFilePath(video, folder, folioID);
  if(!file) return 
  const { path, url } = file
  await supabase.storage.from(folder).upload(path, video);
  return url;
}