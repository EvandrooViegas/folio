import Image from "next/image";
import React from "react";
import { useNodeContext } from ".";

export default function Gallery() {
  const { node }  = useNodeContext()
  if (node.type !== "gallery") return null;
  const images = node.value
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {images?.map((image) => (
          <div className="relative w-full h-48 " key={image.id}>
            <Image alt="Image" fill src={image.url} className="rounded object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
