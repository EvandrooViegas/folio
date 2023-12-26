"use client";
import Image from "next/image";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import getLocalFileURL from "@/utils/getLocalFileURL";
import { useNodeContext } from "../context/NodeContext";
import { useRef, useState } from "react";
import errorToast from "@/utils/errorToast";
import { toast } from "react-toastify";
import { iVideoNodeDataSchema } from "@/types/nodes/video/iVideoNode";
import Title from "@/components/section/title";

type Video = {};
export default function Video() {
  const [isLoading, setIsLoading] = useState(false);
  const { setNodeValue, node, isEditing } = useNodeContext();
  const [video, setVideo] = useState<iVideoNodeDataSchema>(isEditing ? node.value.data :{
    url: "",
    video: null,
    provider: "local",
  });
  const onFileUpload = async (e: React.FormEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const v = (e.target as HTMLInputElement).files?.[0];
      if (!v) return;
      const fileSizeInMB = v.size / 1024 / 1024;
      if (fileSizeInMB > 50) {
        return toast.error("The video is too large");
      }
      const url = await getLocalFileURL(v);

      if (!url) return errorToast();
      const nVideo = {
        provider: "local",
        url,
        video: v,
      } as iVideoNodeDataSchema
      setVideo(nVideo);
      setNodeValue({ type: "video", data: nVideo });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <FormItem>
          <FormLabel>Upload a image</FormLabel>
          <Input
            id="video"
            type="file"
            label="Video"
            accept="video/*"
            onFileUpload={onFileUpload}
            isLoading={isLoading}
          />
          <FormMessage />
        </FormItem>
      </div>
      {video.url ? (
        <div className="flex gap-2">
          <Title size="sm">Video Preview: </Title>
          <video width="320" height="240" controls>
            <source src={video.url} type="video/mp4" />
          </video>
        </div>
      ) : null}
    </div>
  );
}
