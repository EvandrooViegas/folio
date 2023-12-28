import z from "zod";

export const galleryNodeSchemaData = z.object({
  id: z.string(),
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
    isImageFileLocal: z.boolean()
});
export const galleryNodeSchema = z.object({
  type: z.literal("gallery"),
  node_id: z.string(),
  data: galleryNodeSchemaData.array().nullable(),
});

export type iGalleryNodeSchema = z.infer<typeof galleryNodeSchema>;
export type iGalleryNodeDataSchema = z.infer<typeof galleryNodeSchemaData>;
