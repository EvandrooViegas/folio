import z from "zod";
import { createNodeValueDataSchema, createNodeValueSchema } from "..";

const data = createNodeValueSchema({
  text: z
    .string()
    .min(2, {
      message: "Text must have at least 2 characters.",
    })
    .nullable(),
});
export const textNodeSchema = createNodeValueDataSchema("text", data);
