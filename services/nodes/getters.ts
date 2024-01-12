import supabase from "@/lib/supabase";
import { iNodeInsert } from "@/types/nodes";
import { getNodeValue } from "./values/getters";

export async function getNodeByAttr(attr: keyof iNodeInsert, v: any) {
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
  
  export async function getNodesByAttr(attr: keyof iNodeInsert, v: any) {
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
  