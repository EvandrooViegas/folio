
import z from "zod"
import { textNodeSchema } from "./text/iTextNode";
import { galleryNodeSchema } from "./gallery/iGalleryNode";

export const NodeFormSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    value: z.union([textNodeSchema, galleryNodeSchema])
  });
type Form = z.infer<typeof NodeFormSchema>;
export type NodeTypes = Form["value"]["type"];
export type NodeValue = Form["value"];
export type Node = Form;
