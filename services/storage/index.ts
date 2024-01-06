import env from "../env";
import { getAuthedUserID } from "../user";

export const CDN_URL = `${env.supabaseUrl}/storage/v1/object/public`;

export async function getFilePath(video: File) {
const usrID = await getAuthedUserID()
  if (!usrID) return;
  const ext = (video?.name as string).split(".")[1];
  return constructFileURL({ ext, fileName: crypto.randomUUID(), usrID });
}

export function constructFileURL({
  usrID,
  fileName,
  ext
}: {
  usrID: string,
  fileName: string,
  ext: string
}) {
  return `${usrID}/${fileName}.${ext}`
}

export function getNodeFileInfo(fileURL: string) {
    const url = fileURL.split(CDN_URL + "/")[1];
    const [buckedName, userID, file] = url.split("/");
    const [fileName, fileExtension] = file.split(".");
    const path = `${userID}/${fileName}.${fileExtension}`;
    return { buckedName, userID, file, fileName, fileExtension, path };
  }
  