import z from "zod";
import { createNodeValueDataSchema, createNodeValueSchema } from "..";

const provider = z.union([z.literal("local"), z.literal("youtube")])
export const videoNodeSchemaData = createNodeValueDataSchema({
  video: z.any().optional().default(null),
  url: z.string().optional().default(""),
  provider,
  isVideoFileLocal: z.boolean().default(false),
})

export type iVideoProvider = z.infer<typeof provider>

export const videoNodeSchema = createNodeValueSchema(
  "video", 
  //@ts-ignore
  videoNodeSchemaData
)


