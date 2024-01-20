import z from "zod";
import { createNodeValueDataSchema, createNodeValueSchema } from "..";

export const galleryNodeSchemaData = createNodeValueDataSchema({
  image: z.any().optional().default(null),
  url: z.string().optional().default(""),
  title: z
    .string()
    .max(100, {
      message: "Title must not have more than 100 characters.",
    })
    .default("")
    .optional(),
  description: z
    .string()
    .max(300, {
      message: "Description must not have more than 300 characters.",
    })
    .default("")
    .optional(),
  isImageFileLocal: z.boolean(),
});
const galleryNodeSchemaDataAsArray = galleryNodeSchemaData.array();

export const galleryNodeSchema = createNodeValueSchema(
  "gallery",
  //@ts-ignore
  galleryNodeSchemaData
);

export const galleryNodeSchemaAsArray = createNodeValueSchema<
  typeof galleryNodeSchemaDataAsArray
>(
  "gallery",
  //@ts-ignore
  galleryNodeSchemaDataAsArray
);
