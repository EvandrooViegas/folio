import z from "zod";
import { iNodeTypes } from "..";

const def = {
  id: z.string(),
  wasEdited: z.boolean().default(false),
  wasRemoved: z.boolean().default(false),
  isNew: z.boolean().default(true),
};

const b = z.object(def)
type Def = z.infer<typeof b>;
export type iNodeValueDataBase = Def
export function createNodeValueDataSchema<T>(d: T) {
  const schema = z.object({
    ...def,
    ...(d),
  });
  return schema;
}
type Data<T> = z.ZodObject<
  //@ts-ignore
  Def,
  "strict",
  z.ZodTypeAny,
  T,
  T
>;
export function createNodeValueSchema<T>(t: iNodeTypes, data: Data<T>) {
  return z.object({
    type: z.literal(t),
    node_id: z.string(),
    data,
  });
}
