"use server";

import { iTransformedNode } from "@/types/nodes";
import { getAuthedUserID } from "../user";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/supabase/database.types";

export async function saveNodes(nodes: iTransformedNode[]) {
  const supabase = createServerActionClient({ cookies });
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

export async function getNodeByID(id: string) {
  const supabase = createServerActionClient<Database>({ cookies });
  const node = await supabase
  .from("nodes")
  .select()
  .eq("id", id)
  .single()
  .then((r) => r.data);
  return node
}
export async function getNodesByID(nodes:  { id: string }[]) {
  return await Promise.all(
    nodes.map((node) => {
      return getNodeByID(node.id);
    })
  );
}
