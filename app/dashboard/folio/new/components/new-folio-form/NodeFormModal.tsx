"use client";

import React from "react";

import Modal from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import SectionTitle from "@/components/section/SectionTitle";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NodeValue from "./NodeValue";
import { galleryNodeSchema } from "@/types/nodes/gallery/iGalleryNode";
import z from "zod"
import { textNodeSchema } from "@/types/nodes/text/iTextNode";
import { NodeValue as INodeValue } from "@/types/nodes";


const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  value: z.union([textNodeSchema, galleryNodeSchema]),
});

type Form = z.infer<typeof FormSchema>;

export default function NodeFormModal() {
  const form = useForm<Form>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      value: { type: "text", data: "" },
    },
  });

  const onNodeValueChange = (nValue: INodeValue) => {
    form.setValue("value", nValue);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  return (
    <div className="p-4 border border-neutral-200 border-dashed">
      <Modal isOpen={true}>
        <div>
          <SectionTitle>Create a new Node</SectionTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="This is your public folio display name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="value"
                render={() => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <NodeValue onNodeValueChange={onNodeValueChange} />
                  </FormItem>
                )}
              />
              <Button type="submit" size={"sm"} className="mt-4">
                Create
              </Button>
            </form>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
