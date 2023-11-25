import z from "zod";
import { NodeFormSchema } from "./nodes";

export const FolioSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .optional(),
  nodes: NodeFormSchema.array().min(1, {
    message: "You must have at least 1 node",
  }),
});

export type Folio = z.infer<typeof FolioSchema>;
