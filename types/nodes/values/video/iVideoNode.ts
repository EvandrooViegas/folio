import z from "zod";
import { createNodeValueDataSchema, createNodeValueSchema } from "..";

const data = createNodeValueSchema({
  url: z.string().optional().default(""),
  provider: z.union([z.literal("local"), z.literal("youtube")]),
  isVideoFileLocal: z.boolean().default(false),
})

export const videoNodeSchema = createNodeValueDataSchema("video", data)

