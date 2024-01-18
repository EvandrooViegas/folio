"use client"
import React from "react";
import useGallery from "./useGallery";
import Title from "@/components/section/title";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ImageForm() {
  const {
    isEditingImage,
    handleFileUpload: onFileUpload,
    currImage,
    formControl,
    handleSubmit,
    cancel,
    shouldShowForm,
  } = useGallery();
  console.log(shouldShowForm)
  if (!shouldShowForm) return;
  return (
    <div className="border border-input border-dashed p-4 space-y-4">
      <Title size="sm">{isEditingImage ? "Edit a Image" : "Add a Image"}</Title>
      <FormField
        control={formControl}
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
        control={formControl}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="What is your image about?" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="space-y-2">
        <div className="relative w-full h-40 bg-neutral-100 p-2 rounded">
          <Image
            fill
            src={currImage.url || ""}
            alt="Image"
            className="rounded object-cover"
          />
        </div>
        {isEditingImage && (
          <FormItem>
            <FormLabel>
              Replace Image
            </FormLabel>
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
          onClick={handleSubmit}
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
  );
}
