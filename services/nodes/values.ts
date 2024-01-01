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

async function getValuesList(values: iNodeValueSchema[]) {
  const valuesList =  [] as iNodeValueInsert[]
  const pr = values.map(async(item) => {
    const res = await transformNodeValueToInsert(item);
    
    if(Array.isArray(res)) res.forEach(i => valuesList.push(i))
    else valuesList.push(res)
  });
  await Promise.all(pr)
  return valuesList
}
export async function insertOrEditNodesValues(
  values: iNodeValueSchema[],
  isEditing: boolean = false
) {
  const list = await getValuesList(values) 

  const pr = list.map(value => {
    const from = `${value.type}_nodes`
    const f = supabase.from(from)[isEditing ? "update" : "insert"](value)
    if(isEditing) {
      return f.eq("id", value.id)
    } else {
      return f
    }
  })
  await Promise.all(pr)
}

export async function insertNodesValue(values: iNodeValueSchema[]) {
  await Promise.all(
    values.map(async (value) => {
      const res = await transformNodeValueToInsert(value);
      switch (value.type) {
        case "text": {
          return await supabase
            .from("text_nodes")
            .insert(res as iTextNodeInsert)["eq"];
        }
        case "gallery": {
          return await Promise.all(
            (res as iGalleryNodeInsert[]).map((v) =>
              supabase.from("gallery_nodes").insert(v)
            )
          );
        }
        case "video": {
          return await supabase
            .from("video_nodes")
            .insert(res as iVideoNodeInsert);
        }
      }
    })
  );
}

export async function updateNodesValue(values: iNodeValueSchema[]) {
  await Promise.all(
    values.map(async (value) => {
      const res = await transformNodeValueToInsert(value);

      switch (value.type) {
        case "text": {
          return await supabase
            .from("text_nodes")
            .update(res as iTextNodeInsert)
            .eq("id", value.data.id);
        }
        case "gallery": {
          return await Promise.all(
            (res as iGalleryNodeInsert[]).map((v) =>
              supabase.from("gallery_nodes").update(v).eq("id", v.id)
            )
          );
        }
        case "video": {
          return await supabase
            .from("video_nodes")
            .update(res as iVideoNodeInsert)
            .eq("id", value.data.id);
        }
      }
    })
  );
}

const transformNodeValueToInsert = async (val: iNodeValueSchema)
:Promise<iNodeValueInsert | iNodeValueInsert[]> => {
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
        const url = await getNodeFileURL({
          file: i.image,
          isLocal: i.isImageFileLocal,
          type: "image",
          url: i.url,
        });
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
      const url = await getNodeFileURL({
        file: value.data.video,
        isLocal: value.data.isVideoFileLocal,
        type: "video",
        url: value.data.url,
      });
      if (!url) return;
      return {
        id: value.data.id,
        provider: value.data.provider,
        url,
        node_id: value.node_id,
      } as iVideoNodeInsert;
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
  type,
}: {
  file: File;
  shouldUpload: boolean;
  type: "image" | "video";
}) {
  switch (type) {
    case "image":
      return shouldUpload
        ? await uploadNodeImage(file)
        : await editNodeImage(file);
    case "video":
      return shouldUpload
        ? await uploadNodeVideo(file)
        : await editNodeVideo(file);
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
