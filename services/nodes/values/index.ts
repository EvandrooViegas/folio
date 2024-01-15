import supabase from "@/lib/supabase";
import { iNodeValueSchema } from "@/types/nodes";
import { getTableName, getValuesList } from "./getters";
import removeObjProperties from "@/utils/removeObjProperties";

export async function insertOrEditNodesValues(values: iNodeValueSchema[]) {
  const list = await getValuesList(values);
  const pr = list.map((value) => {
    const from = getTableName(value.type);
    if (!from) return;
    const isEditing = value.isEditing;
    const valueToInsert = removeObjProperties<typeof value>(
      ["isEditing"],
      value
    );
    if (isEditing) {
      return supabase.from(from).update(valueToInsert).eq("id", value.id);
    } else {
      return supabase.from(from).insert(valueToInsert);
    }
  });
  await Promise.all(pr);
}
