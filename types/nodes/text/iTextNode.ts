import z from "zod"

const textNodeSchemaData = z
.string()
.min(2, {
  message: "Text must have at least 2 characters.",
})
.nullable()
export const textNodeSchema = z.object({
    type: z.literal("text"),
    data: textNodeSchemaData,
  })

  export type ITextNodeData = z.infer<typeof textNodeSchemaData>



  