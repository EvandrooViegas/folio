import { transformNodes } from "./transformers";
import { getNodesByID, saveNodes } from "./server-actions";
import { NewNode } from "@/types/nodes";

type Options = {
  returnNodes: boolean;
};
export async function createNodes(
  nodes: NewNode[],
  options: Options = { returnNodes: false }
) {
  const { returnNodes } = options;
  const transformedNodes = await transformNodes(nodes);
  await saveNodes(transformedNodes);
  if (returnNodes) {
    const newNodes = await getNodesByID(transformedNodes);
    console.log(newNodes)
    return newNodes;
  }
}
