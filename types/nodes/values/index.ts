import z from "zod"
import { iNodeTypes } from ".."

type Opt = {
    isArray: boolean,
}
export function createNodeValueSchema(d: {}, opt?: Opt) {
    const schema = z.object({
        id: z.string(),
        wasEdited: z.boolean(),
        ...d
    })
    if(opt.isArray) {
        return schema.array().default([]) 
    }
} 
export function createNodeValueDataSchema(t: iNodeTypes, d: any) {
return z.object({
    type: z.literal(t),
    node_id: z.string(),
    data: d,
  });
}