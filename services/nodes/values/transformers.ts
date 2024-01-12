import { iGalleryNodeInsert, iNodeValueInsert, iNodeValueSchema, iTextNodeInsert, iVideoNodeInsert, iVideoNodeValueSchema } from "@/types/nodes";
import { getNodeFileURL } from "./getters";

export const transformNodeValueToInsert = async (
    val: iNodeValueSchema,
    isEditing: boolean
  ): Promise<iNodeValueInsert | iNodeValueInsert[]> => {
    switch (val.type) {
      case "text":
        return {
          id: val.data.id,
          text: val.data.text || "",
          type: "text",
          node_id: val.node_id,
        } as iTextNodeInsert;
      case "gallery":
        const pr = val.data.map(async (i) => {
          const url = await getNodeFileURL(
            {
              file: i.image,
              isLocal: i.isImageFileLocal,
              type: "gallery",
              url: i.url,
              id: i.id,
            },
            isEditing
          );
          if (!url) return;
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
        const value = val as iVideoNodeValueSchema;
        const url = await getNodeFileURL(
          {
            file: value.data.video,
            isLocal: value.data.isVideoFileLocal,
            type: "video",
            url: value.data.url,
            id: value.data.id,
          },
          isEditing
        );
        if (!url) return;
        return {
          id: value.data.id,
          provider: value.data.provider,
          url,
          node_id: value.node_id,
          type: "video",
        } as iVideoNodeInsert;
      }
    }
  };