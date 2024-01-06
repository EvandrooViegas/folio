import supabase from "@/lib/supabase";
import {
  iGalleryNodeInsert,
  iNodeTypes,
  iNodeValueInsert,
  iNodeValueSchema,
  iTextNodeInsert,
  iVideoNodeInsert,
  iVideoNodeValueSchema,
} from "@/types/nodes";
import { editNodeImage, uploadNodeImage } from "../storage/images";
import { editNodeVideo, uploadNodeVideo } from "../storage/videos";

function getTableName(type: iNodeTypes) {
  return `${type}_nodes`;
}

async function getValuesList(values: iNodeValueSchema[], isEditing: boolean) {
  const valuesList = [] as iNodeValueInsert[];
  const pr = values.map(async (item) => {
    const res = await transformNodeValueToInsert(item, isEditing);

    if (Array.isArray(res)) res.forEach((i) => valuesList.push(i));
    else valuesList.push(res);
  });
  await Promise.all(pr);
  return valuesList;
}
export async function insertOrEditNodesValues(
  values: iNodeValueSchema[],
  isEditing: boolean
) {
  const list = await getValuesList(values, isEditing);
  console.log(list);
  const pr = list.map((value) => {
    const from = getTableName(value.type);
    if (isEditing) {
      return supabase.from(from).update(value).eq("id", value.id);
    } else {
      return supabase.from(from).insert(value);
    }
  });
  await Promise.all(pr);
}

const transformNodeValueToInsert = async (
  val: iNodeValueSchema,
  isEditing: boolean
): Promise<iNodeValueInsert | iNodeValueInsert[]> => {
  console.log(val);
  switch (val.type) {
    case "text":
      return {
        id: val.data.id,
        text: val.data.text || "",
        type: "text",
        node_id: val.node_id,
      } as iTextNodeInsert;
    case "gallery":
      const pr = val.data.map(async (i) => {
        const url = await getNodeFileURL(
          {
            file: i.image,
            isLocal: i.isImageFileLocal,
            type: "gallery",
            url: i.url,
            id: i.id,
          },
          isEditing
        );
        if (!url) return;
        return {
          id: i.id,
          type: "gallery",
          node_id: val.node_id,
          description: i.description || "",
          title: i.title || "",
          url,
        } as iGalleryNodeInsert;
      });
      return await Promise.all(pr);

    case "video": {
      const value = val as iVideoNodeValueSchema;
      console.log(value);
      const url = await getNodeFileURL(
        {
          file: value.data.video,
          isLocal: value.data.isVideoFileLocal,
          type: "video",
          url: value.data.url,
          id: value.data.id,
        },
        isEditing
      );
      console.log(url);
      if (!url) return;
      return {
        id: value.data.id,
        provider: value.data.provider,
        url,
        node_id: value.node_id,
        type: "video",
      } as iVideoNodeInsert;
    }
  }
};

async function getNodeFileURL(
  value: {
    isLocal: boolean;
    type: "gallery" | "video";
    file: File;
    url: string;
    id: string;
  },
  isEditing
) {
  if (value.isLocal) {
    if (isEditing) {
      const { data: prevValue } = await supabase
      .from(getTableName(value.type))
      .select()
      .eq("id", value.id)
      .single();
      console.log(prevValue, value.id, value.type)
      const prevURL = prevValue.url;
      if (!prevURL) return;
      if (value.type === "gallery") return await editNodeImage(prevURL, value.file);
      else if (value.type === "video") return await editNodeVideo(prevURL, value.file);
    } else {
      if (value.type === "gallery") return await uploadNodeImage(value.file);
      else if (value.type === "video") return await uploadNodeVideo(value.file);
    }

  } else {
    return value.url;
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
