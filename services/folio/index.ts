import supabase from "@/lib/supabase";
import { iCompleteFolio, iFolio, iNewFolio } from "@/types/folio";
import { getAuthedUserID } from "../user";
import { getNodesByFolioID } from "../nodes/getters";
import removeObjProperties from "@/utils/removeObjProperties";

export async function createOrUpdateFolio(
  folio: Omit<iNewFolio, "user_id">,
  isEditing: boolean
) {
  if (!folio.id) return;
  const userID = await getAuthedUserID();
  if (!userID) return;
  const [transformedFolio] = removeObjProperties<iCompleteFolio>(
    ["nodes"],
    folio as iCompleteFolio
  );

  transformedFolio.user_id = userID
  if (isEditing) {
    await supabase
      .from("folios")
      .update(transformedFolio)
      .eq("id", folio.id);
  } else {
    await supabase
      .from("folios")
      .insert(transformedFolio);
  }
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
