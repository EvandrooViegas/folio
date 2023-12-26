import { iNewNodeSchema, iNode, iNodeValueDataSchema } from "@/types/nodes";
// function is responsible for transform the nodes
// from the database into a node list for the form
export function transformNodes(nodes: iNode[]): iNewNodeSchema[] {
  return nodes.map((node) => {
    let data = getNodeDataByType(node);
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
      return node.value?.text || "";
    case "gallery":
      return node.value
        ? node.value.map((i) => ({
            id: i.id,
            isImageFileLocal: false,
            url: i.url,
            description: i.description || "",
            image: null,
            title: i.title || "",
          }))
        : [];
    case "video":
      return {
        video: null,
        provider: node.value?.provider || "local",
        url: node.value?.url || "",
      };
  }
}
