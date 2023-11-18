import z from "zod"
import { textNodeSchema } from "./text/iTextNode";
import { galleryNodeSchema } from "./gallery/iGalleryNode";
const FormSchema = z.object({
    value: z.union([textNodeSchema, galleryNodeSchema]),
  });

  type Form = z.infer<typeof FormSchema>
export type NodeTypes = Form["value"]["type"];
export type NodeValue = Form["value"];