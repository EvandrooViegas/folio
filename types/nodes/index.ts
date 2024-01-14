import z from "zod";
import { textNodeSchema, textNodeSchemaData } from "./values/text/iTextNode";
import { galleryNodeSchema, galleryNodeSchemaData } from "./values/gallery/iGalleryNode";
import { videoNodeSchema, videoNodeSchemaData } from "./values/video/iVideoNode";
import { Database } from "@/lib/supabase/database.types";

const nodeValue = z.union([textNodeSchema, galleryNodeSchema, videoNodeSchema])
const nodeValueData = z.union([textNodeSchemaData, galleryNodeSchemaData.array(), videoNodeSchemaData])

const nodeTypes = z.union([z.literal("text"), z.literal("gallery"), z.literal("video")])
export const NodeFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  value: nodeValue,
  id: z.string(),
  folio_id: z.string(),
  wasEdited: z.boolean().default(true),
  isNew: z.boolean()
});
export type iNodeSchema = z.infer<typeof NodeFormSchema>;

export type iTextNodeValueSchema = z.infer<typeof textNodeSchema>
export type iGalleryNodeValueSchema = z.infer<typeof galleryNodeSchema>
export type iVideoNodeValueSchema = z.infer<typeof videoNodeSchema>
export type iNodeValueSchema = iTextNodeValueSchema | iGalleryNodeValueSchema  | iVideoNodeValueSchema

export type iTextValueDataSchema = z.infer<typeof textNodeSchemaData>
export type iGalleryValueDataSchema = z.infer<typeof galleryNodeSchemaData>
export type iVideoValueDataSchema = z.infer<typeof videoNodeSchemaData>
export type iNodeValueDataSchema = z.infer<typeof nodeValueData>



export type iGalleryNodeInsert = Database["public"]["Tables"]["gallery_nodes"]["Insert"]
export type iTextNodeInsert = Database["public"]["Tables"]["text_nodes"]["Insert"]
export type iVideoNodeInsert = Database["public"]["Tables"]["video_nodes"]["Insert"]
export type iNodeValueInsert = iVideoNodeInsert  | iTextNodeInsert | iGalleryNodeInsert   

export type iGalleryNode = Database["public"]["Tables"]["gallery_nodes"]["Row"]
export type iTextNode = Database["public"]["Tables"]["text_nodes"]["Row"]
export type iVideoNode = Database["public"]["Tables"]["video_nodes"]["Row"]
export type iNodeValue = iGalleryNode | iTextNode | iVideoNode

export type iNode = Database["public"]["Tables"]["nodes"]["Row"] & { value: iNodeValue }
export type iNodeInsert = Database["public"]["Tables"]["nodes"]["Insert"];
export type iNodeTypes = z.infer<typeof nodeTypes>