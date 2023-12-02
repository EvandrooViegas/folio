"use client";

import React, { useState } from "react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NodeValue from "./NodeValue";
import z from "zod";
import { Node, NodeFormSchema, NodeValue as INodeValue } from "@/types/nodes";
import { useModalContext } from "@/components/ui/modal";
import { useFolioFormContext } from "../context/FolioFormContext";
import { NodeContext } from "../context/NodeContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const FormSchema = NodeFormSchema;
export type Form = z.infer<typeof FormSchema>;

export default function NodeFormModal() {
  const { closeModal } = useModalContext();
  const { addNode, folio_id } = useFolioFormContext();
  const [value, setValue] = useState<INodeValue>({ type: "text", data: "" })
  const nodeForm = useForm<Node>({
    resolver: zodResolver(NodeFormSchema),
    defaultValues: {
      title: "",
      value ,
      version: "v1",
      folio_id,
      id: crypto.randomUUID()
    },
  });

  function onSubmit() {
    const node = nodeForm.getValues();
    addNode(node);
    closeModal();
  }

  const setNodeValue = (nNode: INodeValue) => {
    nodeForm.setValue("value", nNode)
    setValue(nNode)
  }

  return (
    <NodeContext.Provider
      value={{ setNodeValue, form: nodeForm }}
    >
      <Form {...nodeForm}>
        <div className="space-y-2">
          <FormField
            control={nodeForm.control}
            name={`title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="This is your public folio display title"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={nodeForm.control}
            name={`value.data`}
            render={({ field }) => (
              <FormItem>
                <NodeValue field={field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size={"sm"}
            className="mt-4"
            onClick={nodeForm.handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </div>
      </Form>
    </NodeContext.Provider>
  );
}
