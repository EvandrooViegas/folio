import supabase from "@/lib/supabase";
import {
  iGalleryNodeInsert,
  iNodeTypes,
  iNodeValueSchema,
} from "@/types/nodes";
import { iGalleryNodeDataSchema } from "@/types/nodes/gallery/iGalleryNode";
import { uploadNodeImage } from "../storage/images";

export async function insertNodesValue(nodeValues: iNodeValueSchema[]) {
  await Promise.all(
    nodeValues.map(async (node) => {
      
      console.log(node.node_id)
      switch (node.type) {
        case "text": {
          return await supabase.from("text_nodes").insert({
            text: node.data || "",
            node_id: node.node_id,
          });
     
        }
        case "gallery":
          return await Promise.all(
            node.data
              ? node.data.map(async (value) => {
                  const imageURL = await getNodeValueImageURL(value);
                  if (!imageURL) return;
                  const valueToInsert: iGalleryNodeInsert = {
                    node_id: node.node_id,
                    description: value.description || "",
                    title: value.title || "",
                    url: imageURL,
                    type: "gallery",
                  };
                  return supabase.from("gallery_nodes").insert(valueToInsert);
                })
              : []
          );
      }
    })
  );
}

async function getNodeValueImageURL(value: iGalleryNodeDataSchema) {
  if (value.isImageFileLocal) {
    return await uploadNodeImage(value.image);
  } else {
    return value.url;
  }
}

export async function getNodeValue(type: iNodeTypes, nodeID: string) {
  switch (type) {
    case "text":
      return await supabase
        .from("text_nodes")
        .select()
        .eq("node_id", nodeID)
        .single()
        .then((r) => r.data);
    case "gallery":
      return await supabase
        .from("gallery_nodes")
        .select()
        .eq("node_id", nodeID)
        .then((r) => r.data);
  }
}