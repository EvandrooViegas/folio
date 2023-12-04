import z from "zod";
import { NodeFormSchema, iNode } from "./nodes";
import { Database } from "@/lib/supabase/database.types";

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
  id: z.string(),
  private: z.boolean().default(true)
});

export type Folio = z.infer<typeof FolioSchema>;
export type iFolio = Database['public']['Tables']['folios']['Row']
export type iCompleteFolio = iFolio & { nodes: iNode[] }
export type iNewFolio = Database['public']['Tables']['folios']['Insert']