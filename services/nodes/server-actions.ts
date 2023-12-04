

import { iTransformedNode } from "@/types/nodes";
import { getAuthedUserID } from "../user";
import supabase from "@/lib/supabase";

export async function saveNodes(nodes: iTransformedNode[]) {
  const userID = await getAuthedUserID();
  if (!userID) return;

  await Promise.all(
    nodes.map((node) => {
      return supabase.from("nodes").insert({
        ...node,
        user_id: userID,
      });
    })
  );
}

export async function getNodesByFolioID(id: string) {
  const rawNodes = await supabase.from("nodes").select().eq("folio_id", id);
  if(!rawNodes.data) return 
  return rawNodes.data.map(node => ( { ...node, value: JSON.parse(node.value as string) }))
}

export async function getNodeByID(id: string) {
  const node = await supabase
    .from("nodes")
    .select()
    .eq("id", id)
    .single()
    .then((r) => r.data);
  return node;
}
export async function getNodesByID(nodes: { id: string }[]) {
  return await Promise.all(
    nodes.map((node) => {
      return getNodeByID(node.id);
    })
  );
}
