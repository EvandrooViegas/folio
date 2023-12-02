import { uploadNodeImage } from "@/services/storage/images";
import { NewNode, iNode, iTransformedNode } from "@/types/nodes";

export async function transformNodes(nodes: NewNode[]): Promise<iTransformedNode[]> {
  const transformedNodes = await Promise.all(
    nodes.map(async (node) => {
      switch (node.value.type) {
        case "gallery":
          if(!node.value.data) return {
            ...node,
            value: {
              ...node.value,
              data: []
            }
          }
          return {
            ...node,
            value: {
              ...node.value,
              data: await Promise.all(node.value.data?.map(async(image) => ({
                id: image.id,
                description: image.description,
                title: image.title,
                url:  await uploadNodeImage(image.image),
              }))),
            },
          };
        default:
          return node;
      }
    })
  );

  return transformedNodes.map((n) => ({
    ...n,
    value: JSON.stringify(n.value),
  })) ;
}
