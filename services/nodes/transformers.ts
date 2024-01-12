import { iNewNodeSchema, iNodeInsert } from "@/types/nodes";

export function transformNodeToInsert(node: iNewNodeSchema, usrID: string): iNodeInsert {
    return {
      folio_id: node.folio_id,
      title: node.title,
      user_id: usrID,
      type: node.value.type,
      id: node.id,
    }
  }