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
  const id = isEditing ? nodeData.id : crypto.randomUUID();
  const isNew = !isEditing;
  const wasEdited = false;
  switch (type) {
    case "text":
      return {
        id,
        isNew,
        text: (nodeData as iTextValueDataSchema).text,
        wasEdited,
      } as iTextValueDataSchema;
    case "gallery":
      return isEditing ? nodeData : ([] as iGalleryValueDataSchema[]);
    case "video":
      return {
        id,
        isNew,
        isVideoFileLocal: isEditing ? false : true,
        provider: "local",
        url: isEditing ? (nodeData as iVideoValueDataSchema).url : "",
        wasEdited,
        video: null,
      } as iVideoValueDataSchema;
  }
}
