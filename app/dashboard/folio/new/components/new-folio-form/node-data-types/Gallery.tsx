"use client";
import { Input } from "@/components/ui/input";
import { uploadNodeImage } from "@/services/storage/images";
import errorToast from "@/utils/errorToast";
import React, { useState } from "react";

export default function Gallery() {
  const [imgs, setImgs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const onFileUpload = async (e: React.FormEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const img = (e.target as HTMLInputElement).files
      ? (e.target as HTMLInputElement).files?.[0]
      : null;
    if (!img) return errorToast();
    const url = await uploadNodeImage(img);
    console.log(url);
    if (!url) return errorToast();
    setImgs([...imgs, url]);
    setIsLoading(false);
  };
  return (
    <div>
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
      <div className="flex gap-4">
        {imgs.map((img) => (
          <img key={img} src={img} />
        ))}
      </div>
    </div>
  );
}
