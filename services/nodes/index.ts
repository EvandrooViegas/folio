import supabase from "@/lib/supabase";
import { iNewNodeSchema, iNodeInsert } from "@/types/nodes";
import { getAuthedUserID } from "../user";
import { getNodeValue, insertNodesValue, updateNodesValue } from "./values";

type Options = {
  returnNodes: boolean;
};

function transformNodeToInsert(node: iNewNodeSchema, usrID: string): iNodeInsert {
  return {
    folio_id: node.folio_id,
    title: node.title,
    user_id: usrID,
    type: node.value.type,
    id: node.id,
  }
}
export async function createNodes(
  nodes: iNewNodeSchema[],
  options: Options = { returnNodes: false }
) {
  const userID = await getAuthedUserID();
  if (!userID) return;
  //saving the nodes
  const pr = nodes.map((node) => {
    return supabase
     .from("nodes")
     .insert(transformNodeToInsert(node, userID));
  })

  await Promise.all(pr);

  //saving the nodes value (text, gallery, video)
  await insertNodesValue(nodes.map((node) => node.value));

  if (options.returnNodes) {
    const newNodes = await getNodesByID(nodes);
    return newNodes;
  }
}

export async function updateNodes(
  nodes: iNewNodeSchema[]
) {
  const userID = await getAuthedUserID();
  const pr = nodes.map((node) => {
    return supabase
     .from("nodes")
     .update(transformNodeToInsert(node, userID))
     .eq("id", node.id)
  })
  await Promise.all(pr)
  await updateNodesValue(nodes.map((node) => node.value))
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

export async function getNodesByID(nodes: { id?: string }[]) {
  return await Promise.all(
    nodes.map((node) => {
      if(!node.id) return 
      return getNodeByID(node.id);
    })
  );
}
