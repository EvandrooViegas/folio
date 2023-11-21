import z from "zod";

export const galleryNodeSchemaData = z.object({
  id: z.string(),
  image: z.any().default(null),
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
});
export const galleryNodeSchema = z.object({
  type: z.literal("gallery"),
  data: galleryNodeSchemaData.array().nullable(),
});

export type IGalleryNode = z.infer<typeof galleryNodeSchema>;
export type IGalleryNodeData = z.infer<typeof galleryNodeSchemaData>;
