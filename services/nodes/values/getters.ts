import supabase from "@/lib/supabase";
import { editNodeImage, uploadNodeImage } from "@/services/storage/images";
import { editNodeVideo, uploadNodeVideo } from "@/services/storage/videos";
import {
  iGalleryValueDataSchema,
  iNodeTypes,
  iNodeValueInsert,
  iNodeValueSchema,
  iVideoValueDataSchema,
} from "@/types/nodes";
import { transformNodeValueToInsert } from "./transformers";

type Data = iVideoValueDataSchema | iGalleryValueDataSchema;

export async function getNodeFileURL(type: "video" | "gallery", data: Data) {
  const isVideo = type === "video";
  const isLocal = isVideo
    ? (data as iVideoValueDataSchema).isVideoFileLocal
    : (data as iGalleryValueDataSchema).isImageFileLocal;
  const file = isVideo
    ? (data as iVideoValueDataSchema).video
    : (data as iGalleryValueDataSchema).image;
  const url = data.url;
  const id = data.id;
  const isEditing = data.isNew === false && data.wasEdited;
  if (isLocal) {
    if (isEditing) {
      const from = getTableName(type);
      if (!from) return;
      const { data: prevValue } = await supabase
        .from(from)
        .select()
        .eq("id", id)
        .single();
      const prevURL = prevValue?.url!;
      if (!prevURL) return;
      if (type === "gallery") return await editNodeImage(prevURL, file);
      else if (type === "video") return await editNodeVideo(prevURL, file);
    } else {
      if (type === "gallery") return await uploadNodeImage(file);
      else if (type === "video") return await uploadNodeVideo(file);
    }
  } else {
    return url;
  }
}

export async function getNodeValue(type: iNodeTypes, nodeID: string) {
  switch (type) {
    case "text":
      const res = await supabase
        .from("text_nodes")
        .select()
        .eq("node_id", nodeID)
        .single()
        .then((r) => r.data);

      return res;
    case "gallery":
      return await supabase
        .from("gallery_nodes")
        .select()
        .eq("node_id", nodeID)
        .then((r) => r.data);
    case "video":
      return await supabase
        .from("video_nodes")
        .select()
        .eq("node_id", nodeID)
        .single()
        .then((r) => r.data);
  }
}

type InsertNode = iNodeValueInsert & { isEditing: boolean };
export async function getValuesList(
  values: iNodeValueSchema[]
): Promise<InsertNode[]> {
  const valuesList = [] as InsertNode[];
  const push = (isEditing: boolean, v: iNodeValueInsert) => {
    valuesList.push({ ...v, isEditing });
  };
  const pr = values.map(async (item) => {
    const isEditing = item.data.isNew === false && item.data.wasEdited === true;
    const res = await transformNodeValueToInsert(item);
    if (!res) return;
    if (Array.isArray(res)) res.forEach((i) => push(isEditing, i));
    else push(isEditing, res);
  });
  await Promise.all(pr);
  return valuesList;
}

export function getTableName(type?: iNodeTypes | null) {
  if (!type) return;
  return `${type}_nodes`;
}
