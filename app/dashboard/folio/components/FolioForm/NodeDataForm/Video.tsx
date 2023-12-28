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
  const [video, setVideo] = useState<iVideoNodeDataSchema>(
    isEditing
      ? node.value.data
      : {
          url: "",
          video: null,
          provider: "local",
        }
  );
  const onFileUpload = async (e: React.FormEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const v = (e.target as HTMLInputElement).files?.[0];
      if (!v) return;
      const fileSizeInMB = v.size / 1024 / 1024;
      if (fileSizeInMB > 50) {
        return toast.error("The video is too large");
      }
       console.log(v)
      const url = await getLocalFileURL(v);
      if (!url) return errorToast();
      const nVideo = {
        provider: "local",
        url,
        video: v,
      } as iVideoNodeDataSchema;

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
    {video.url.slice(0 , 6)[0]}
      {video.video ? (
        <div className="flex flex-col gap-2">
          <video className="w-full max-w-[500px] mx-auto aspect-video" controls>
            <source src={video.url}  />
            <p>Couldnt load the video</p>
          </video>
        </div>
      ) : null}
    </div>
  );
}
