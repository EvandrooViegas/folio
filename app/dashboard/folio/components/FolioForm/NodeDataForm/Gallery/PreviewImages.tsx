import React from "react";
import useGallery from "./useGallery";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import RemoveImageBtn from "./RemoveImageBtn";


export default function PreviewImages() {
  const {
    isEditingImage,
    previewImages,
    editImage,
    isImageBeingEdited,
  } = useGallery();
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {previewImages.map((image) => (
        <div
          className="group relative flex flex-col gap-0.5 border border-dashed border-neutral-300 p-3 rounded"
          key={image.id}
        >
          <div className="relative h-40">
            <Image
              src={image.url || ""}
              fill
              className="object-cover align-top rounded "
              alt="Image"
            />
          </div>
          <span className="text-dimmed text-sm font-semibold">
            {image.title}
          </span>
          <span className="truncate text-xs text-dimmed ">
            {image.description}
          </span>

          {!isEditingImage && (
            <div className="transition-all absolute inset-0 opacity-0 group-hover:opacity-100 flex gap-0 flex-col justify-center items-center text-white  bg-black/60">
              <Button
                size="sm"
                variant="underline"
                onClick={() => editImage(image)}
              >
                Edit
              </Button>
             <RemoveImageBtn id={image.id} />
            </div>
          )}
          {isImageBeingEdited(image) && (
            <div className="absolute inset-0 flex justify-center bg-neutral-700/80 text-white font-bold items-center">
              Being Edited...
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
