import {
  iGalleryValueDataSchema,
  iNodeSchema,
  iNodeTypes,
  iTextValueDataSchema,
  iVideoValueDataSchema,
} from "@/types/nodes";

export default function getNodeInitialData(
  type: iNodeTypes,
  node: iNodeSchema,
  isEditing: boolean
) {
  const nodeData = node.value.data;
  const id = nodeData.id || crypto.randomUUID();
  const isNew = !isEditing;
  const wasEdited = false;
const wasRemoved = false
  switch (type) {
    case "text":
      return {
        id,
        text: (nodeData as iTextValueDataSchema).text,
        isNew,
        wasEdited,
        wasRemoved
      } satisfies iTextValueDataSchema;
    case "gallery":
      return (isEditing ? nodeData : []) satisfies iGalleryValueDataSchema[]
    case "video":
      return {
        id,
        isNew,
        isVideoFileLocal: isEditing ? false : true,
        provider: "local",
        url: isEditing ? (nodeData as iVideoValueDataSchema).url : "",
        wasEdited,
        wasRemoved,
        video: null,
      } satisfies iVideoValueDataSchema;
  }
}
