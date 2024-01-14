import supabase from "@/lib/supabase";
import { iNewNodeSchema } from "@/types/nodes";
import { getAuthedUserID } from "../user";
import { insertOrEditNodesValues } from "./values";
import { transformNodeToInsert } from "./transformers";

export async function createOrUpdateNodes(
  nodes: iNewNodeSchema[],
  isEditing: boolean
) {
  const userID = await getAuthedUserID();
  if (!userID) return;
  const pr = nodes.map((node) => {
    const transformedNode = transformNodeToInsert(node, userID);
    if (isEditing) {
      if (!node.wasEdited) return;
      supabase.from("nodes").update(transformedNode).eq("id", node.id);
    } else {
      return supabase.from("nodes").insert(transformedNode);
    }
  });
  await Promise.all(pr);
  await insertOrEditNodesValues(nodes.map((node) => node.value), isEditing);
}
