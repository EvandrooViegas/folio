import z from "zod";
import { textNodeSchema } from "./text/iTextNode";
import { galleryNodeSchema } from "./gallery/iGalleryNode";
import { Database } from "@/lib/supabase/database.types";

export const NodeFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  value: z.union([textNodeSchema, galleryNodeSchema]),
  version: z.literal("v1"),
  id: z.string(),
  folio_id: z.string(),
});
export type NewNode = z.infer<typeof NodeFormSchema>;
export type NodeTypes = NewNode["value"]["type"];
export type NodeValue = NewNode["value"];

export type iNode = Database['public']['Tables']['nodes']['Row']
export type iTransformedNode = Omit<iNode, "created_at" | "user_id"> 