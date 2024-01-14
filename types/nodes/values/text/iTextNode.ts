import z from "zod";
import { createNodeValueDataSchema, createNodeValueSchema } from "..";

export const textNodeSchemaData = createNodeValueDataSchema({
  text: z
    .string()
    .min(2, {
      message: "Text must have at least 2 characters.",
    })
    .nullable(),
})
export const textNodeSchema = createNodeValueSchema(
  "text",
  //@ts-ignore
  textNodeSchemaData
);


