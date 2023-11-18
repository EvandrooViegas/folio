"use client";
import { Input } from "@/components/ui/input";
import {
  getNodeImageInfo,
  removeNodeImages,
  uploadNodeImage,
} from "@/services/storage/images";
import errorToast from "@/utils/errorToast";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import {
  IGalleryNodeData,
  galleryNodeSchemaData,
} from "@/types/nodes/gallery/iGalleryNode";
import { useNodeValueContext } from "../NodeValue";

const FormSchema = galleryNodeSchemaData;
type Form = z.infer<typeof FormSchema>;

export default function Gallery() {
  const [images, setImages] = useState<IGalleryNodeData[]>([]);
  const [newImage, setNewImage] = useState<IGalleryNodeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { onNodeValueChange } = useNodeValueContext();
  const uploadedNodeImagesPath = useRef<string[]>([]);

  const form = useForm<Form>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: newImage?.id || "",
      url: newImage?.url || "",
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    return () => {
      const paths = images.map((img) => getNodeImageInfo(img.url).path);
      const imagesToDelete = uploadedNodeImagesPath.current.filter((uplImg) =>
        paths.includes(uplImg)
      );
      removeNodeImages(imagesToDelete);
    };
  }, []);

  const onFileUpload = async (e: React.FormEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const img = (e.target as HTMLInputElement).files
      ? (e.target as HTMLInputElement).files?.[0]
      : null;
    if (!img) return errorToast();
    const url = await uploadNodeImage(img);
    if (!url) return errorToast();
    setNewImage({
      id: crypto.randomUUID(),
      url,
    });
    uploadedNodeImagesPath.current = [
      ...uploadedNodeImagesPath.current,
      getNodeImageInfo(url).path,
    ];
    setIsLoading(false);
  };

  const onImageCreation = (data: any) => {
    const nImage = { ...data, ...newImage } as IGalleryNodeData;
    const nImages = [nImage, ...images];
    onNodeValueChange({
      type: "gallery",
      data: nImages,
    });
    setImages(nImages);
    setNewImage(null);
  };

  const onCancel = () => {};
  return (
    <div className="min-w-[500px] flex flex-col gap-2">
      <div>
        <Input
          id="picture"
          type="file"
          label="Picture"
          accept="image/png,image/jpeg"
          onFileUpload={onFileUpload}
          isLoading={isLoading}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {images.map((image) => (
          <div className="flex flex-col gap-0.5 border border-dashed border-neutral-300 p-3 rounded" key={image.id}>
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
          </div>
        ))}
      </div>

      {newImage && (
        <div className="border border-input border-dashed p-4 space-y-4">
          <Form {...form}>
            <FormField
              control={form.control}
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
              control={form.control}
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
                </FormItem>
              )}
            />
            <div className="relative w-full h-40 bg-neutral-100 p-2 rounded">
              <Image
                fill
                src={newImage.url}
                alt="New Image"
                className=" object-center object-fit"
              />
            </div>
            <div className="flex gap-2 items-center">
              <Button
                type="submit"
                size={"sm"}
                className="mt-4"
                variant="outline"
                onClick={form.handleSubmit(onImageCreation)}
              >
                Add
              </Button>
              <Button
                type="submit"
                size={"sm"}
                className="mt-4"
                variant="link"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
