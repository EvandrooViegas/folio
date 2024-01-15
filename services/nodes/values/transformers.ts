import {
  iGalleryNodeInsert,
  iGalleryValueDataSchema,
  iNodeValueInsert,
  iNodeValueSchema,
  iTextNodeInsert,
  iTextValueDataSchema,
  iVideoNodeInsert,
  iVideoValueDataSchema,
} from "@/types/nodes";
import { getNodeFileURL } from "./getters";

export const transformNodeValueToInsert = async (
  val: iNodeValueSchema
): Promise<iNodeValueInsert | iNodeValueInsert[] | undefined>  => {

  switch (val.type) {
    case "text":
      const textData = val.data as iTextValueDataSchema;
      return {
        id: textData.id,
        text: textData.text || "",
        type: "text",
        node_id: val.node_id,
      } as iTextNodeInsert;
    case "gallery":
      const galleryData = val.data as unknown as iGalleryValueDataSchema[];
      const pr = galleryData.map(async (i) => {
        const url = await getNodeFileURL("gallery", i);
        return {
          id: i.id,
          type: "gallery",
          node_id: val.node_id,
          description: i.description || "",
          title: i.title || "",
          url,
        } as iGalleryNodeInsert;
      });

      return await Promise.all(pr);
    case "video": {
      const videoData = val.data as iVideoValueDataSchema;
      const url = await getNodeFileURL("video", videoData);
      if (!url) return;
      return {
        id: videoData.id,
        provider: videoData.provider,
        url,
        node_id: val.node_id,
        type: "video",
      } as iVideoNodeInsert;
    }
  }
};
