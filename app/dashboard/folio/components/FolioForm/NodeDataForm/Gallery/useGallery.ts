import { useState } from "react";
import { useNodeContext } from "../../context/NodeContext";
import { useNodeValueDataContext } from "../context";
import { iGalleryValueDataSchema } from "@/types/nodes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { galleryNodeSchemaData } from "@/types/nodes/values/gallery/iGalleryNode";
import getLocalFileURL from "@/utils/getLocalFileURL";
import errorToast from "@/utils/errorToast";

export default function useGallery() {
  const [isLoading, setIsLoading] = useState(false);
  const { setNodeValue } = useNodeContext();
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

  const setNewImages = (
    nImages: iGalleryValueDataSchema[],
    reset: boolean = true
  ) => {
    setNodeValue({ type: "gallery", data: nImages });
    setPreviewImages(nImages);
    if (reset) {
      cancel();
      imageForm.reset();
    }
  };

  const removeImage = (id: string) => {
    const filtredList = previewImages.map((img) =>
      img.id === id
        ? ({ ...img, wasRemoved: true } as iGalleryValueDataSchema)
        : img
    );
    setNewImages(filtredList);
  };
  const handleAddImage = () => {
    imageForm.handleSubmit(() => {
      const nImage = imageForm.getValues();
      const nImages = [nImage, ...previewImages];
      setNewImages(nImages);
    });
  };

  const handleEditImage = () => {
    imageForm.handleSubmit(() => {
      const nImage = imageForm.getValues();
      const filtredImages = previewImages.filter((img) => img.id !== nImage.id);
      filtredImages.push(nImage);
      setNewImages(filtredImages);
    });
  };

  const handleSubmit = () => {
    const f = isEditingImage ? handleEditImage : handleAddImage;
    f();
  };

  const cancel = () => {
    if (isEditingImage) {
      setIsEditingImage(false);
    } else {
      setIsCreatingImage(false);
    }
  };

  const editImage = (image: iGalleryValueDataSchema) => {
    setIsEditingImage(true);
    imageForm.reset();
    imageForm.setValue("id", image.id);
    imageForm.setValue("description", image.description);
    imageForm.setValue("title", image.title);
    imageForm.setValue("url", image.url);
    imageForm.setValue("isNew", false);
    imageForm.setValue("wasEdited", true);
  };
  const handleFileUpload = async (e: React.FormEvent<HTMLInputElement>) => {
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

  const shouldShowForm = isEditingImage || isCreatingImage;
  const currImage = imageForm.getValues();
  const isImageBeingEdited = (image: iGalleryValueDataSchema) => {
    return currImage.id === image.id && isEditingImage;
  };

  return {
    isLoading,
    previewImages,
    isCreatingImage,
    isEditingImage,
    removeImage,
    cancel,
    editImage,
    handleFileUpload,
    isImageBeingEdited,
    shouldShowForm,
    currImage,
    handleSubmit,
    formControl: imageForm.control,
  };
}
