"use client";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import getLocalFileURL from "@/utils/getLocalFileURL";
import { useNodeContext } from "../context/NodeContext";
import { useRef, useState } from "react";
import errorToast from "@/utils/errorToast";
import { toast } from "react-toastify";
import { iVideoValueDataSchema } from "@/types/nodes";
import { useNodeValueDataContext } from "./context";
import { iVideoProvider } from "@/types/nodes/values/video/iVideoNode";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YoutubeVideo from "@/components/YoutubeVideo";

const providers = {
  youtube: "youtube" satisfies iVideoProvider,
  local: "local" satisfies iVideoProvider,
};
export default function Video() {
  const [isLoading, setIsLoading] = useState(false);
  const { setNodeDataValue } = useNodeContext();

  const { initialNodeData } = useNodeValueDataContext<iVideoValueDataSchema>();

  const [provider, setProvider] = useState(
    initialNodeData.provider || (providers.youtube as iVideoProvider)
  );
  const [url, setUrl] = useState(initialNodeData.url);

  const [video, setVideo] = useState(initialNodeData);
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
        isVideoFileLocal: true,
        id: initialNodeData.id,
      } as iVideoValueDataSchema;

      setVideo(nVideo);
      setNodeDataValue(nVideo, initialNodeData, "video");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Tabs defaultValue={providers.youtube}>
          <TabsList>
            <TabsTrigger value={providers.youtube}>Youtube</TabsTrigger>
            <TabsTrigger value={providers.local}>Local</TabsTrigger>
          </TabsList>
          <TabsContent value={providers.youtube} className="space-y-2">
            <div>
              <Input
                placeholder="Enter Youtube Video URL"
                onChange={(e) => setUrl(e.target.value)}
              />
              {url && <YoutubeVideo url={url} />}
            </div>
          </TabsContent>
          <TabsContent value={providers.local}>
            <div>
              <FormLabel>Upload a image</FormLabel>
              <Input
                id="video"
                type="file"
                label="Video"
                accept="video/*"
                onFileUpload={onFileUpload}
                isLoading={isLoading}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {video.url ? (
        <div className="flex flex-col gap-2" key={video.url}>
          <video className="w-full max-w-[500px] mx-auto aspect-video" controls>
            <source src={video.url} />
            <p>Couldnt load the video</p>
          </video>
        </div>
      ) : null}
    </div>
  );
}
