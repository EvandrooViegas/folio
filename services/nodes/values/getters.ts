import supabase from "@/lib/supabase";
import { editNodeImage, uploadNodeImage } from "@/services/storage/images";
import { editNodeVideo, uploadNodeVideo } from "@/services/storage/videos";
import { iNodeTypes, iNodeValueInsert, iNodeValueSchema } from "@/types/nodes";
import { transformNodeValueToInsert } from "./transformers";

export async function getNodeFileURL(
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
  
  export async function getValuesList(values: iNodeValueSchema[], isEditing: boolean) {
    const valuesList = [] as iNodeValueInsert[];
    const pr = values.map(async (item) => {
      const res = await transformNodeValueToInsert(item, isEditing);
  
      if (Array.isArray(res)) res.forEach((i) => valuesList.push(i));
      else valuesList.push(res);
    });
    await Promise.all(pr);
    return valuesList;
  }

  export function getTableName(type: iNodeTypes) {
    return `${type}_nodes`;
  }