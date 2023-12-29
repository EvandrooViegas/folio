import supabase from "@/lib/supabase";
import {
  iGalleryNodeInsert,
  iNodeTypes,
  iNodeValueSchema,
  iTextNodeInsert,
  iVideoNodeInsert,
} from "@/types/nodes";
import { editNodeImage, uploadNodeImage } from "../storage/images";
import { editNodeVideo, uploadNodeVideo } from "../storage/videos";

export async function insertNodesValue(nodeValues: iNodeValueSchema[]) {
  await Promise.all(
    nodeValues.map(async (node) => {
      switch (node.type) {
        case "text": {
          const res = (await transformNodeValueToInsert(
            node
          )) as iTextNodeInsert;
          return await supabase.from("text_nodes").insert(res);
        }
        case "gallery": {
          const res = (await transformNodeValueToInsert(
            node
          )) as iGalleryNodeInsert[];
          return await Promise.all(
            res.map((v) => supabase.from("gallery_nodes").insert(v))
          );
        }

        case "video": {
          const res = transformNodeValueToInsert(node) as iVideoNodeInsert;
          return await supabase.from("video_nodes").insert(res);
        }
      }
    })
  );
}

export async function updateNodesValue(nodeValues: iNodeValueSchema[]) {
  await Promise.all(
    nodeValues.map(async (node) => {
      switch (node.type) {
        case "text": {
          const res = (await transformNodeValueToInsert(
            node
          )) as iTextNodeInsert;
          return await supabase.from("text_nodes").update(res).eq("id", node.id);
        }
        case "gallery": {
          const res = (await transformNodeValueToInsert(
            node
          )) as iGalleryNodeInsert[];
          return await Promise.all(
            res.map((v) =>
              supabase.from("gallery_nodes").update(v).eq("id", v.id)
            )
          );
        }

        case "video": {
          const res = transformNodeValueToInsert(node) as iVideoNodeInsert;
          return await supabase
            .from("video_nodes")
            .update(res)
            .eq("id", );
        }
      }
    })
  );
}

const transformNodeValueToInsert = async (nv: iNodeValueSchema) => {
  switch (nv.type) {
    case "text":
      return {
        text: nv.data || "",
        type: "text",
        node_id: nv.node_id,
      };
    case "gallery":
      return await Promise.all(
        nv.data.map(async (val) => ({
          node_id: nv.node_id,
          description: val.description || "",
          title: val.title || "",
          url: await getNodeFileURL({
            file: val.image,
            isLocal: val.isImageFileLocal,
            type: "image",
            url: val.url
          }),
          type: "gallery",
        }))
      );
    case "video": {
      return {
        provider: nv.data.provider,
        url: await getNodeFileURL({
          file: nv.data.video,
          isLocal: nv.data.isVideoFileLocal,
          type: "video",
          url: nv.data.url
        }),
        node_id: nv.node_id,
      };
    }
  }
};

async function getNodeFileURL(
  value: { isLocal: boolean; type: "image" | "video"; file: File; url: string },
  isEditing: boolean = false
) {
  if (value.isLocal) {
    return await uploadOrEditNodeFile({
      file: value.file,
      shouldUpload: true,
      type: value.type,
    });
  } else {
    if (isEditing) {
      return await uploadOrEditNodeFile({
        file: value.file,
        shouldUpload: false,
        type: value.type,
      });
    } else {
      return value.url;
    }
  }
}

async function uploadOrEditNodeFile({
  file,
  shouldUpload,
  url,
  type,
}: {
  file: File;
  shouldUpload: boolean;
  url?: string;
  type: "image" | "video";
}) {
  switch (type) {
    case "image":
      return shouldUpload
        ? await uploadNodeImage(file)
        : await editNodeImage(url, file);
    case "video":
      return shouldUpload
        ? await uploadNodeVideo(file)
        : await editNodeVideo(url, file);
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
    case "video":
      return await supabase
        .from("video_nodes")
        .select()
        .eq("node_id", nodeID)
        .single()
        .then((r) => r.data);
  }
}
