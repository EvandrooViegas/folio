import { iNodeSchema, iNodeInsert } from "@/types/nodes";

export function transformNodeToInsert(node: iNodeSchema, usrID: string): iNodeInsert {
    return {
      folio_id: node.folio_id,
      title: node.title,
      user_id: usrID,
      type: node.type,
      id: node.id,
    }
  }