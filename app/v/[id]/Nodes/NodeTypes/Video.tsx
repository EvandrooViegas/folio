"use client";
import React from "react";
import { useNodeContext } from ".";
import { iVideoNode } from "@/types/nodes";
import YoutubeVideo from "@/components/YoutubeVideo";

export default function Video() {
  const { node } = useNodeContext();
  const nodeValue = node.value as unknown as iVideoNode
  if (node.type != "video") return null;
  if(!nodeValue.url) return "No URL was founded, try again later"
  if(nodeValue.provider === "youtube") return <YoutubeVideo url={nodeValue.url} />
  else return (
    <video controls>
      <source src={node.value.url} />
    </video>
  );
}
