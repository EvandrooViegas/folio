import getYoutubeVideoId from "@/utils/getYoutubeVideoId";
import React from "react";
import YouTube from "react-youtube";

interface Props {
  url: string;
}
export default function YoutubeVideo(props: Props) {
  const { url } = props;
  const videoID = getYoutubeVideoId(url);
  if (!videoID) return "An error occurred when trying to load the video";
  return <YouTube videoId={videoID} />;
}
