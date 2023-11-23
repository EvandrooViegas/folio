"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionTitle from "@/components/section/SectionTitle";
import NodeFormModal from "./NodeFormModal";
import { useState } from "react";
import Modal from "@/components/ui/modal";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .optional(),
  nodes: z
    .object({
      type: z.string(),
      value: z.any().array(),
    })
    .array()
    .min(1, {
      message: "You must have at least 1 node",
    }),
});

export default function NewFolioForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      nodes: [],
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    console.log("open")
    setIsOpen(true);
  }
  const closeModal = () => {
    console.log("close")
    setIsOpen(false);
  }
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  return (
    <div className=" w-full">
         <Modal isOpen={isOpen} close={closeModal}>
          <NodeFormModal />
        </Modal>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <SectionTitle>Create a New Folio</SectionTitle>
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about your new folio"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nodes"
            render={() => (
              <FormItem>
                <div className="flex gap-2 items-center justify-between mb-2">
                  <FormLabel>Nodes</FormLabel>
                  <Button
                    icon="more"
                    size="sm"
                    variant="outline"
                    onClick={openModal}
                  >
                    Create a new node
                  </Button>
                </div>
                <div className="p-4 border border-input border-dashed"></div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
     
      </Form>
    </div>
  );
}
