import supabase from "@/lib/supabase";
import { iNodeSchema } from "@/types/nodes";
import { getAuthedUserID } from "../user";
import { insertOrEditNodesValues } from "./values";
import { transformNodeToInsert } from "./transformers";

export async function createOrUpdateNodes(nodes: iNodeSchema[]) {
  const userID = await getAuthedUserID();
  if (!userID) return;
  const pr = nodes.map((node) => {
   
    const transformedNode = transformNodeToInsert(node, userID);
    console.log(transformedNode)
    const isEditing = node.isNew === false && node.wasEdited
    console.log(isEditing)
    if (isEditing) {
      return supabase.from("nodes").update(transformedNode).eq("id", node.id);
    } else {
      return supabase.from("nodes").insert(transformedNode);
    }
  });
  await Promise.all(pr);
  const values = nodes.map((node) => node.value)
  await insertOrEditNodesValues(values);
}
