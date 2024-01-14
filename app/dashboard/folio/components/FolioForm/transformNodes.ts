import {
  iGalleryNode,
  iGalleryNodeValueSchema,
  iGalleryValueDataSchema,
  iNewNodeSchema,
  iNode,
  iNodeValueDataSchema,
  iTextNode,
  iVideoNode,
  iVideoValueDataSchema,
} from "@/types/nodes";

// function is responsible for transform the nodes
// from the database into a node list for the form
export function transformNodes(nodes: iNode[]): iNewNodeSchema[] {
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
    } as iNewNodeSchema;
    return n;
  });
}

function getNodeDataByType(node: iNode): iNodeValueDataSchema {
  switch (node.type) {
    case "text":
      const textValue = node.value as iTextNode;
      return {
        text: textValue?.text || "",
        id: textValue?.id || "",
        wasEdited: false,
        isNew: false,
      };
    case "gallery":
      const galleryValue = (node.value as unknown as iGalleryNode[]) || [];

      return galleryValue.map((i) => {
        const image: iGalleryValueDataSchema = {
          id: i.id,
          url: i.url,
          description: i.description || "",
          image: null,
          title: i.title || "",
          isImageFileLocal: false,
          isNew: false,
          wasEdited: false,
        };
        return image;
      });

    case "video":
      const videoValue = node.value as iVideoNode;
      return {
        id: videoValue.id,
        video: null,
        provider: videoValue?.provider || "local",
        url: videoValue?.url || "",
        isNew: false,
        wasEdited: false,
        isVideoFileLocal: false,
      } as iVideoValueDataSchema;
  }
}
