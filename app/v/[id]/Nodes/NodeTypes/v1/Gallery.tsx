import { iNode } from "@/types/nodes";
import Image from "next/image";
import React from "react";

type Props = {
  node: iNode;
};
export default function Gallery(props: Props) {
  const { node } = props;
  console.log(node.value);
  const images = node.value.data;
  if (!images || typeof images === "string") return null;
  return (
    <div>
      <h3>{node.title}</h3>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image) => (
          <div className="relative w-full h-48 " key={image.id}>
            <Image alt="Image" fill src={image.url} className="rounded object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
