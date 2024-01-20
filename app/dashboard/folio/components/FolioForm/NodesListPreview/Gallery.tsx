import { iGalleryValueDataSchema } from "@/types/nodes";
import Image from "next/image";
import React from "react";

type Props = {
  gallery: iGalleryValueDataSchema[] | null;
};
export default function Gallery(props: Props) {
  const { gallery } = props;
  const slicedGallery = gallery?.slice(0, 4).filter(img => !img.wasRemoved)
  if (!slicedGallery) return null;
  return (
    <div className="grid grid-cols-2 gap-0.5 bg-neutral-200 ">
      {slicedGallery?.map((image, idx) => (
          <div
            className={`relative grow ${
              slicedGallery.length === 1 ? "col-span-2" : ""
            } aspect-square`}
            key={idx}
          >
            <Image
              src={image.url}
              alt="Image"
              fill
              className="object-cover bg-black "
            />
          </div>
        ))}
    </div>
  );
}
