import getYoutubeVideoId from "@/utils/getYoutubeVideoId";
import React, { useRef } from "react";
import YouTube from "react-youtube";

interface Props {
  url: string;
  onReady?: () => void
}
export default function YoutubeVideo(props: Props) {
  const { url, onReady } = props;
  const videoID = getYoutubeVideoId(url);
  const isVideoInvalid = useRef(false);
  const handleReady = () => {
    if(isVideoInvalid.current) return 
onReady?.()
  }
  if (!videoID) return "An error occurred when trying to load the video";
  return (
    <div className="relative  w-full h-full  rounded-3xl">
      <YouTube
        videoId={videoID}
        opts={{ width: "100%", height: 250 }}
        onReady={handleReady}
        onError={() => (isVideoInvalid.current = true)}
      />
    </div>
  );
}
