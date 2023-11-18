import z from "zod"

export const textNodeSchema = z.object({
    type: z.literal("text"),
    data: z
      .string()
      .min(2, {
        message: "Text must have at least 2 characters.",
      })
      .nullable(),
  })