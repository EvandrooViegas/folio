import supabase from "@/lib/supabase";
import { iNodeValueSchema } from "@/types/nodes";
import { getTableName, getValuesList } from "./getters";

export async function insertOrEditNodesValues(
  values: iNodeValueSchema[],
  isEditing: boolean
) {
  const list = await getValuesList(values, isEditing);
  const pr = list.map((value) => {
    const from = getTableName(value.type);
    if (isEditing) {
      return supabase.from(from).update(value).eq("id", value.id);
    } else {
      return supabase.from(from).insert(value);
    }
  });
  await Promise.all(pr);
}
