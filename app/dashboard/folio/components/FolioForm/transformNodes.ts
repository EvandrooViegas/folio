import {
  iGalleryNode,
  iGalleryValueDataSchema,
  iNode,
  iNodeSchema,
  iNodeValueDataSchema,
  iTextNode,
  iTextValueDataSchema,
  iVideoNode,
  iVideoValueDataSchema,
} from "@/types/nodes";
import { iNodeValueDataBase } from "@/types/nodes/values";

// function is responsible for transform the nodes
// from the database into a node list for the form
export function transformNodes(nodes: iNode[]): iNodeSchema[] {
  return nodes.map((node) => {
    const data = getNodeDataByType(node);
    const n = {
      title: node.title,
      value: {
        data,
        node_id: node.id,
        type: node.type,
      },
      id: node.id,
      folio_id: node.folio_id,
      isNew: false,
      wasEdited: false,
      wasRemoved: false,
      type: node.type,
    } as iNodeSchema;
    return n;
  });
}

const getValueDataBase = <T>(
  node: iNode,
  data: Omit<Omit<Omit<Omit<T, "isNew">, "wasEdited">, "wasRemoved">, "id">,
  idx?: number
) => {
  const base: iNodeValueDataBase = {
    isNew: false,
    wasEdited: false,
    wasRemoved: false,
    id: idx !== undefined ? node.value[idx].id : node.value.id,
  };
  return {
    ...base,
    ...data,
  };
};
function getNodeDataByType(node: iNode): iNodeValueDataSchema {
  switch (node.type) {
    case "text":
      const textValue = node.value as iTextNode;
      return getValueDataBase<iTextValueDataSchema>(node, {
        text: textValue?.text || "",
      });
    case "gallery":
      const galleryValue = (node.value as unknown as iGalleryNode[]) || [];
      return galleryValue.map((i, idx) =>
        getValueDataBase<iGalleryValueDataSchema>(node, {
          url: i.url,
          description: i.description || "",
          image: null,
          title: i.title || "",
          isImageFileLocal: false,
        }, idx)
      );

    case "video":
      const videoValue = node.value as iVideoNode;
      return getValueDataBase<iVideoValueDataSchema>(node, {
        video: null,
        provider: videoValue?.provider || "local",
        url: videoValue?.url || "",
        isVideoFileLocal: false,
      });
  }
}
