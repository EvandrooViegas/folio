"use client";
import { Input } from "@/components/ui/input";
import errorToast from "@/utils/errorToast";
import React, { useState } from "react";
import Image from "next/image";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import getLocalFileURL from "@/utils/getLocalFileURL";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Title from "@/components/section/title";
import { iGalleryValueDataSchema } from "@/types/nodes";
import { galleryNodeSchemaData } from "@/types/nodes/values/gallery/iGalleryNode";
import { useNodeContext } from "../../context/NodeContext";
import { useNodeValueDataContext } from "../context";

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(false);
  const { setNodeDataValue } = useNodeContext();
  const { initialNodeData } =
    useNodeValueDataContext<iGalleryValueDataSchema[]>();

  const [previewImages, setPreviewImages] = useState(initialNodeData);

  const [isCreatingImage, setIsCreatingImage] = useState(false);

  const [isEditingImage, setIsEditingImage] = useState(false);

  const imageForm = useForm<iGalleryValueDataSchema>({
    resolver: zodResolver(galleryNodeSchemaData),
    defaultValues: {
      title: "",
      description: "",
      isNew: true,
      wasEdited: false,
    },
  });

  const editImage = (image: iGalleryValueDataSchema) => {
    setIsEditingImage(true);
    imageForm.reset();
    imageForm.setValue("id", image.id);
    imageForm.setValue("description", image.description);
    imageForm.setValue("title", image.title);
    imageForm.setValue("url", image.url);
    imageForm.setValue("isNew", image.isNew);
    imageForm.setValue("wasEdited", true);
  };

  const onFileUpload = async (e: React.FormEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const img = (e.target as HTMLInputElement).files?.[0];
      const previewUrl = await getLocalFileURL(img);
      if (!previewUrl) return errorToast();

      if (!isEditingImage) {
        imageForm.reset();
      }
      imageForm.setValue("url", previewUrl);
      imageForm.setValue("image", img);
      imageForm.setValue("isImageFileLocal", true);

      if (isEditingImage) return;
      imageForm.setValue("id", crypto.randomUUID());
      setIsCreatingImage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const setNewImages = (
    nImages: iGalleryValueDataSchema[],
    reset: boolean = true
  ) => {
    setNodeDataValue(nImages, initialNodeData, "gallery");
    setPreviewImages(nImages);
    if (reset) {
      cancel();
      imageForm.reset();
    }
  };

  const removeImage = (id: string) => {
    const filtredList = previewImages.map((img) =>
      img.id === id
        ? ({ ...img, wasRemoved: true } satisfies iGalleryValueDataSchema)
        : img
    );
    setNewImages(filtredList);
  };
  const handleAddImage = () => {
    const nImage = imageForm.getValues();
    const nImages = [nImage, ...previewImages];
    setNewImages(nImages);
  };

  const handleEditImage = () => {
    const nImage = imageForm.getValues();
    const filtredImages = previewImages.map((img) => img.id === nImage.id ? nImage : img);
    setNewImages(filtredImages);
  };

  const cancel = () => {
    if (isEditingImage) {
      setIsEditingImage(false);
    } else {
      setIsCreatingImage(false);
    }
  };
  const shouldShowForm = isEditingImage || isCreatingImage;
  const currImage = imageForm.getValues();
  return (
    <div className="flex flex-col gap-2">
      <div>
        <FormItem>
          <Input
            iconName="more"
            id="picture"
            type="file"
            label="Add a new image"
            disabled={isEditingImage}
            accept="image/png,image/jpeg"
            onFileUpload={onFileUpload}
            isLoading={isLoading}
          />
          <FormMessage />
        </FormItem>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {previewImages.filter(img => !img.wasRemoved).map((image) => (
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
                <Button
                  size="sm"
                  variant="underline"
                  onClick={() => removeImage(image.id)}
                >
                  Delete
                </Button>
              </div>
            )}
            {currImage.id === image.id && isEditingImage && (
              <div className="absolute inset-0 flex justify-center bg-neutral-700/80 text-white font-bold items-center">
                Being Edited...
              </div>
            )}
          </div>
        ))}
      </div>

      {shouldShowForm && (
        <div className="border border-input border-dashed p-4 space-y-4">
          <Title size="sm">
            {isEditingImage ? "Edit a Image" : "Add a Image"}
          </Title>
          <FormField
            control={imageForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Add a Title to your Image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={imageForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What is your image about?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <div className="relative w-full h-40 bg-neutral-100 p-2 rounded">
              <Image
                fill
                src={imageForm.getValues("url") || ""}
                alt="Image"
                className="rounded object-cover"
              />
            </div>
            {isEditingImage && (
              <FormItem>
                <FormLabel>Upload a image</FormLabel>
                <Input
                  id="picture"
                  type="file"
                  label="Edit your Image"
                  accept="image/png,image/jpeg"
                  onFileUpload={onFileUpload}
                />
                <FormMessage />
              </FormItem>
            )}
          </div>
          <div className="flex gap-1 items-center">
            <Button
              type="button"
              size={"sm"}
              className="mt-4"
              variant="outline"
              onClick={
                isEditingImage
                  ? handleEditImage
                  : imageForm.handleSubmit(handleAddImage)
              }
            >
              {isEditingImage ? "Edit" : "Add"}
            </Button>
            <Button
              type="button"
              size={"sm"}
              className="mt-4"
              variant="underline"
              onClick={cancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
