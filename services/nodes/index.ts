import supabase from "@/lib/supabase";
import { iNodeSchema } from "@/types/nodes";
import { getAuthedUserID } from "../user";
import { insertOrEditNodesValues } from "./values";
import { transformNodeToInsert } from "./transformers";

export async function createOrUpdateNodes(nodes: iNodeSchema[]) {
  const userID = await getAuthedUserID();
  if (!userID) return;
  const pr = nodes.map((node) => {
    if (!node.isNew && !node.wasEdited) return;
    const transformedNode = transformNodeToInsert(node, userID);
    if (node.isNew) {
      return supabase.from("nodes").insert(transformedNode);
    } else {
      if (!node.wasEdited) return;
      supabase.from("nodes").update(transformedNode).eq("id", node.id);
    }
  });
  await Promise.all(pr);
  const values = nodes.map((node) => node.value)
  await insertOrEditNodesValues(values);
}
