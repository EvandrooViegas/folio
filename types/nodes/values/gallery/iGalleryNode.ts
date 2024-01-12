import z from "zod";
import { createNodeValueDataSchema, createNodeValueSchema } from "..";

export const data = createNodeValueSchema({
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
    .max(3000, {
      message: "Description must not have more than 100 characters.",
    })
    .default("")
    .optional(),
  isImageFileLocal: z.boolean(),
}, {
  isArray: true
});
export const galleryNodeSchema = createNodeValueDataSchema("video", data);

export type iGalleryNodeSchema = z.infer<typeof galleryNodeSchema>;
export type iGalleryNodeDataSchema = z.infer<typeof data>;
