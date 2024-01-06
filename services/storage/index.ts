import env from "../env";
import { getAuthedUserID } from "../user";

export const CDN_URL = `${env.supabaseUrl}/storage/v1/object/public`;

export async function getFilePath(video: File) {
const userID = await getAuthedUserID()
  if (!userID) return;
  const ext = (video?.name as string).split(".")[1];
  return `${userID}/${crypto.randomUUID()}.${ext}`;
}

export function getNodeFileInfo(imageURL: string) {
    const url = imageURL.split(CDN_URL + "/")[1];
    const [buckedName, userID, image] = url.split("/");
    const [imageName, imageExtension] = image.split(".");
    const path = `${userID}/${imageName}.${imageExtension}`;
    return { buckedName, userID, image, imageName, imageExtension, path };
  }
  