import supabase from "@/lib/supabase";
import {
  iGalleryValueDataSchema,
  iNodeTypes,
  iNodeValueInsert,
  iNodeValueSchema,
  iVideoValueDataSchema,
} from "@/types/nodes";
import { transformNodeValueToInsert } from "./transformers";
import { Folders, editNodeMedia, uploadNodeMedia } from "@/services/storage";

type Data = iVideoValueDataSchema | iGalleryValueDataSchema;
export async function getNodeFileURL(type: Folders, data: Data, folioID: string) {
  const isVideo = type === "video";
  const isLocal = isVideo
    ? (data as iVideoValueDataSchema).isVideoFileLocal
    : (data as iGalleryValueDataSchema).isImageFileLocal;
  const file = isVideo
    ? (data as iVideoValueDataSchema).video
    : (data as iGalleryValueDataSchema).image;
  const url = data.url;
  const id = data.id;

  const isEditing = !data.isNew  && data.wasEdited;
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
      editNodeMedia(file, type, folioID)
    } else {
      uploadNodeMedia(file, type, folioID)
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

type Opt = { isEditing: boolean; shouldBeRemoved: boolean };
type InsertNode = iNodeValueInsert & Opt;

export async function getValuesList(
  values: iNodeValueSchema[],
  folioID: string
): Promise<InsertNode[]> {
  const valuesList = [] as iNodeValueSchema[]

  values.forEach(value => {
    if (Array.isArray(value.data)) value.data.forEach(data => valuesList.push({
      data: data,
      node_id: value.node_id,
      type: value.type
    }));
    else return valuesList.push(value);
  });
  const p = valuesList.map(async (value) => {
    const transformedValue = await transformNodeValueToInsert(value, folioID);
    const rest = {
      isEditing: (!value.data.isNew  && value.data.wasEdited) || true,
      shouldBeRemoved: value.data.wasRemoved || false,
    } satisfies Opt;
    return { ...transformedValue, ...rest };
  });

  return await Promise.all(p);
}

export function getTableName(type?: iNodeTypes | null) {
  if (!type) return;
  return `${type}_nodes`;
}
