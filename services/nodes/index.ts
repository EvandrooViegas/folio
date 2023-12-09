import supabase from "@/lib/supabase";
import { iNewNodeSchema, iNodeInsert } from "@/types/nodes";
import { getAuthedUserID } from "../user";
import { getNodeValue, insertNodesValue } from "./values";

type Options = {
  returnNodes: boolean;
};
export async function createNodes(
  nodes: iNewNodeSchema[],
  options: Options = { returnNodes: false }
) {
  await insertNodes(nodes);
  await insertNodesValue(nodes.map((node) => node.value));

  if (options.returnNodes) {
    const newNodes = await getNodesByID(nodes);
    return newNodes;
  }
}

export async function insertNodes(nodes: iNewNodeSchema[]) {
  const userID = await getAuthedUserID();
  if (!userID) return;

  await Promise.all(
    nodes.map((node) => {
      //@ts-ignore
      console.log(node.id)
      return supabase.from("nodes").insert({
        title: node.title,
        folio_id: node.folio_id,
        type: node.value.type,
        id: node.id,
        user_id: userID,
      });
    })
  );
}

async function getNodeByAttr(attr: keyof iNodeInsert, v: any) {
  const node = await supabase
    .from("nodes")
    .select()
    .eq(attr, v)
    .single()
    .then((r) => r.data);
  if (!node) return;
  const value = await getNodeValue(node.type, node.id);
  // @ts-ignore
  return { ...node, value };
}

async function getNodesByAttr(attr: keyof iNodeInsert, v: any) {
  const { data: nodes } = await supabase.from("nodes").select().eq(attr, v);
  console.log(nodes)
  if (!nodes) return;
  // @ts-ignore
  return await Promise.all(
    nodes?.map(async (node) => ({
      ...node,
      value: await getNodeValue(node.type, node.id),
    }))
  );
}

export async function getNodesByFolioID(id: string) {
  const nodes = await getNodesByAttr("folio_id", id);

  return nodes;
}

export async function getNodeByID(id: string) {
  return await getNodeByAttr("id", id);
}

export async function getNodesByID(nodes: { id: string }[]) {
  return await Promise.all(
    nodes.map((node) => {
      return getNodeByID(node.id);
    })
  );
}
