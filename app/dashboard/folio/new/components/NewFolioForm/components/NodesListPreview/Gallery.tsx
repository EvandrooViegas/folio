import { IGalleryNodeData } from "@/types/nodes/gallery/iGalleryNode";
import Image from "next/image";
import React from "react";

type Props = {
  gallery: IGalleryNodeData[] | null;
};
export default function Gallery(props: Props) {
  const { gallery: rawGallery } = props;
  const gallery = rawGallery?.splice(0, 4)
  if(!gallery) return null
  return (
    <div className="grid grid-cols-2 gap-0.5 bg-neutral-200 ">
      {gallery?.map(image => {
        return (
          <div
            className={`relative grow ${
              gallery.length === 1 ? "col-span-2" : ""
            } aspect-square`}
            key={image.id}
          >
            <Image
              src={image.localPreviewURL}
              alt="Image"
              fill
              className="object-cover bg-black "
            />
          </div>
        );
      })}
    </div>
  );
}
