"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

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
import SectionTitle from "@/components/section/title";
import NodeFormModal from "./components/NodeFormModal";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import { Folio, FolioSchema } from "@/types/folio";
import NodeListPreview from "./components/NodesListPreview";
import { FolioFormContext } from "./context/FolioFormContext";

export default function NewFolioForm() {
  const form = useForm<Folio>({
    resolver: zodResolver(FolioSchema),
    defaultValues: {
      name: "",
      description: "",
      nodes: [],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "nodes",
    rules: {
      validate: {
        
      }
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  function onSubmit(data: Folio) {
    console.log(data);
  }
  const folio = form.getValues();

  return (
    <FolioFormContext.Provider value={{ form, nodeFieldArray: fieldArray  }}>
      <div className=" w-full">
        <Modal isOpen={isOpen} close={closeModal} title="Create a new Node">
          <NodeFormModal  />
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
                  <div className="p-4 border border-input border-dashed rounded overflow-y-auto">
                    <NodeListPreview nodes={folio.nodes} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </FolioFormContext.Provider>
  );
}
