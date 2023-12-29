import env from "../env";

export const CDN_URL = `${env.supabaseUrl}/storage/v1/object/public`;

export function getFilePath({
  userID,
  imgName,
  imgExt,
}: {
  userID: string;
  imgName: string;
  imgExt: string;
}) {
  if (!userID) return;
  return `${userID}/${imgName}.${imgExt}`;
}

export function getNodeFileInfo(imageURL: string) {
    const url = imageURL.split(CDN_URL + "/")[1];
    const [buckedName, userID, image] = url.split("/");
    const [imageName, imageExtension] = image.split(".");
    const path = `${userID}/${imageName}.${imageExtension}`;
    return { buckedName, userID, image, imageName, imageExtension, path };
  }
  