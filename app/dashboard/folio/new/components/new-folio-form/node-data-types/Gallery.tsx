"use client" 
import { Input } from "@/components/ui/input";
import errorToast from "@/utils/errorToast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";

export default function Gallery() {
  const [] = useState<string[]>([])
  const supabase = createClientComponentClient()
  const onFileUpload = async (e: React.FormEvent<HTMLInputElement>) => {
    const img = e.target?.files?.[0]
    if(!img) return errorToast()
    const ext = (img?.name as string).split(".")[1]

    const name = `${crypto.randomUUID()}.${ext}`
    
  const { data, error } = await supabase.storage.from("node_images").upload(name, img)
  console.log(data)
  console.log(error)
  }
  return (
    <div>
      <div>
        <Input id="picture" type="file" label="Picture" accept="image/png,image/jpeg" onFileUpload={onFileUpload} />
      </div>
    </div>
  );
}
