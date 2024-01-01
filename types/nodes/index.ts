import z from "zod";
import { textNodeSchema } from "./text/iTextNode";
import { galleryNodeSchema } from "./gallery/iGalleryNode";
import { Database } from "@/lib/supabase/database.types";
import { videoNodeSchema } from "./video/iVideoNode";

const nodeValue = z.union([textNodeSchema, galleryNodeSchema, videoNodeSchema])
const nodeTypes = z.union([z.literal("text"), z.literal("gallery"), z.literal("video")])
export const NodeFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  value: nodeValue,
  id: z.string(),
  folio_id: z.string(),
});
export type iNewNodeSchema = z.infer<typeof NodeFormSchema>;

export type iTextNodeValueSchema = z.infer<typeof textNodeSchema>
export type iGalleryNodeValueSchema = z.infer<typeof galleryNodeSchema>
export type iVideoNodeValueSchema = z.infer<typeof videoNodeSchema>

export type iNodeValueSchema = iTextNodeValueSchema | iGalleryNodeValueSchema  | iVideoNodeValueSchema
export type iNodeValueDataSchema = z.infer<typeof nodeValue>["data"];

export type iGalleryNodeInsert = Database["public"]["Tables"]["gallery_nodes"]["Insert"]
export type iTextNodeInsert = Database["public"]["Tables"]["text_nodes"]["Insert"]
export type iVideoNodeInsert = Database["public"]["Tables"]["video_nodes"]["Insert"]

export type iGalleryNode = Database["public"]["Tables"]["gallery_nodes"]["Row"]
export type iTextNode = Database["public"]["Tables"]["text_nodes"]["Row"]
export type iVideoNode = Database["public"]["Tables"]["video_nodes"]["Row"]

type Value = ({
  type: "gallery",
  value: iGalleryNode[] | null
} | {
  type: "text",
  value: iTextNode | null
} | {
  type: "video",
  value: iVideoNode | null
})
export type iNode = Database["public"]["Tables"]["nodes"]["Row"] & Value
export type iNodeInsert = Database["public"]["Tables"]["nodes"]["Insert"];
export type iNodeTypes = z.infer<typeof nodeTypes>
export type iNodeValueInsert = iVideoNodeInsert  | iTextNodeInsert | iGalleryNodeInsert   