import z from "zod";

const videoNodeSchemaData = z.object({
  id: z.string(),
  video: z.any(),
  url: z.string().optional().default(""),
  provider: z.union([z.literal("local"), z.literal("youtube")]),
  isVideoFileLocal: z.boolean().default(false),
});
export const videoNodeSchema = z.object({
  type: z.literal("video"),
  node_id: z.string(),
  data: videoNodeSchemaData,
});

export type iVideoNodeDataSchema = z.infer<typeof videoNodeSchemaData>;
