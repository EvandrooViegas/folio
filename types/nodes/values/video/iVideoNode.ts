import z from "zod";
import { createNodeValueDataSchema, createNodeValueSchema } from "..";

export const videoNodeSchemaData = createNodeValueDataSchema({
  video: z.any().optional().default(null),
  url: z.string().optional().default(""),
  provider: z.union([z.literal("local"), z.literal("youtube")]),
  isVideoFileLocal: z.boolean().default(false),
})

export const videoNodeSchema = createNodeValueSchema(
  "video", 
  //@ts-ignore
  videoNodeSchemaData
)


