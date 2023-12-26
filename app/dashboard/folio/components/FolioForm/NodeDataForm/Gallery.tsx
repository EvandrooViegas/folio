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
import {
  galleryNodeSchemaData, iGalleryNodeDataSchema,
} from "@/types/nodes/gallery/iGalleryNode";
import getLocalFileURL from "@/utils/getLocalFileURL";
import getFileInfo from "@/utils/getFileInfo";
import { useNodeContext } from "../context/NodeContext";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function Gallery() {
  const [isLoading, setIsLoading] = useState(false);
  const { setNodeValue, form, node, isEditing } = useNodeContext();
  const [previewImages, setPreviewImages] = useState<iGalleryNodeDataSchema[]>(node.value.data || []);

  const [imageToEdit, setImageEdit] = useState(null)
  const imageForm = useForm<iGalleryNodeDataSchema>({
    resolver: zodResolver(galleryNodeSchemaData),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onFileUpload = async (e: React.FormEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);

      const img = (e.target as HTMLInputElement).files?.[0];
      const previewUrl = await getLocalFileURL(img);
      if (!previewUrl) return errorToast();
      const fileInfo = getFileInfo(img);
      if (!fileInfo?.extension || !fileInfo.type) return errorToast();
      imageForm.setValue("id", crypto.randomUUID());
      imageForm.setValue("url", previewUrl);
      imageForm.setValue("image", img);
      imageForm.setValue("isImageFileLocal", true);
      setIsCreatingImage(true)
    } finally {
      setIsLoading(false);
    }
  };

  const addPreviewImage = () => {
    const nImage = imageForm.getValues()
    const nImages = [nImage, ...previewImages];
    setPreviewImages(nImages);
    setNodeValue({ type: "gallery", data: nImages });
    setIsCreatingImage(false)
    imageForm.reset()
  };
  const nImage = imageForm.getValues()
  return (
    <div className="flex flex-col gap-2">
      <div>
        <FormItem>
          <FormLabel>Upload a image</FormLabel>
          <Input
            id="picture"
            type="file"
            label="Picture"
            accept="image/png,image/jpeg"
            onFileUpload={onFileUpload}
            isLoading={isLoading}
          />
          <FormMessage />
        </FormItem>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {previewImages.map((image) => (
          <div
            className="relative flex flex-col gap-0.5 border border-dashed border-neutral-300 p-3 rounded"
            key={image.id}
          >
            <div className="relative h-40">
              <Image
                src={image.url}
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
            <div className="text-neutral-500 absolute  right-2 bottom-2  cursor-pointer">
              
              <DropdownMenu  >
                <DropdownMenuTrigger  />
                <DropdownMenuContent className="w-56 ">
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsEditingImage(node)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openModal(node)}>
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {isCreatingImage || isEditingImage && (
        <div className="border border-input border-dashed p-4 space-y-4">
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
          <div className="relative w-full h-40 bg-neutral-100 p-2 rounded">
            <Image
              fill
              src={nImage.url}
              alt="New Image"
              className="rounded object-cover"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Button
              type="submit"
              size={"sm"}
              className="mt-4"
              variant="outline"
              onClick={imageForm.handleSubmit(addPreviewImage)}
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
