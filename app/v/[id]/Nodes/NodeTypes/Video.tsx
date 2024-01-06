"use client";
import React from "react";
import { useNodeContext } from ".";

export default function Video() {
  const { node } = useNodeContext();
  if (node.type != "video") return null;
  return (
    <video controls>
      <source src={node.value.url} />
    </video>
  );
}
