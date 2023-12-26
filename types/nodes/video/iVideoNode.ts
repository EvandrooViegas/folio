import z from "zod";

const videoNodeSchemaData = z.object({
    video: z.any(),
    url: z.string(),
    provider: z.union([z.literal("local"), z.literal("youtube")])
})
export const videoNodeSchema = z.object({
  type: z.literal("video"),
  node_id: z.string(),
  data: videoNodeSchemaData,
});

export type iVideoNodeDataSchema = z.infer<typeof videoNodeSchemaData>;
