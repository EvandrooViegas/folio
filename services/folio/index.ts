import supabase from "@/lib/supabase";
import { iCompleteFolio, iFolio, iNewFolio } from "@/types/folio";
import { getAuthedUserID } from "../user";
import { getNodesByFolioID } from "../nodes/getters";

export async function createFolio(folio: Omit<iNewFolio, "user_id">) {
  const userID = await getAuthedUserID();
  if (!userID) return;
  await supabase.from("folios").insert({ ...folio, user_id: userID });
}

export async function updateFolio(folio: Omit<iNewFolio, "user_id">) {
  const userID = await getAuthedUserID();
  await supabase
    .from("folios")
    .update({ ...folio, user_id: userID })
    .eq("id", folio.id);
}

export async function fetchUserFolios() {
  const userID = await getAuthedUserID();
  if (!userID) return;
  const res = await supabase.from("folios").select().eq("user_id", userID);
  return res.data;
}

type Options = {
  include: {
    nodes: boolean;
  };
};
export async function getFolioByID(
  id: string | undefined,
  options: Options = { include: { nodes: true } }
): Promise<iCompleteFolio | iFolio | undefined | null> {
  if (!id) return;
  const { include } = options;
  const res = await supabase.from("folios").select().eq("id", id).single();
  if (!include.nodes) {
    return res.data;
  }
  const nodes = await getNodesByFolioID(id);
  const completeFolio = { ...res.data, nodes } as iCompleteFolio;
  return completeFolio;
}
