"use client";
import { Input } from "@/components/ui/input";
import {
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useGallery from "./useGallery";
import PreviewImages from "./PreviewImages";
import ImageForm from "./ImageForm";

export default function Gallery() {
  const {
    isEditingImage,
    handleFileUpload: onFileUpload,
    isLoading,

  } = useGallery();

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
            data-testid="uploadImageInput"
            isLoading={isLoading}
          />
          <FormMessage />
        </FormItem>
      </div>
      <PreviewImages />
      <ImageForm />
    </div>
  );
}
