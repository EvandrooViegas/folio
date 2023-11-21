import { galleryNodeSchema } from "@/types/nodes/gallery/iGalleryNode";
import { textNodeSchema } from "@/types/nodes/text/iTextNode";
import z from "zod";
export const NodeFormSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    value: z.union([textNodeSchema, galleryNodeSchema]),
  });