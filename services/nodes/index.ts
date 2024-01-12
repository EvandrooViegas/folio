import supabase from "@/lib/supabase";
import { iNewNodeSchema, iNodeInsert } from "@/types/nodes";
import { getAuthedUserID } from "../user";
import { insertOrEditNodesValues } from "./values";
import { getNodesByID } from "./getters";
import { transformNodeToInsert } from "./transformers";

type Options = {
  returnNodes: boolean;
};

export async function createNodes(
  nodes: iNewNodeSchema[],
  options: Options = { returnNodes: false }
) {
  const userID = await getAuthedUserID();
  if (!userID) return;
  //saving the nodes
  const pr = nodes.map((node) => {
    return supabase.from("nodes").insert(transformNodeToInsert(node, userID));
  });

  await Promise.all(pr);

  //saving the nodes value (text, gallery, video)
  await insertOrEditNodesValues(
    nodes.map((node) => node.value),
    false
  );

  if (options.returnNodes) {
    const newNodes = await getNodesByID(nodes);
    return newNodes;
  }
}

export async function updateNodes(nodes: iNewNodeSchema[]) {
  const userID = await getAuthedUserID();
  const pr = nodes.map((node) => {
    return supabase
      .from("nodes")
      .update(transformNodeToInsert(node, userID))
      .eq("id", node.id);
  });
  await Promise.all(pr);
  const values = nodes.map((node) => node.value);
  await insertOrEditNodesValues(values, true);
}
