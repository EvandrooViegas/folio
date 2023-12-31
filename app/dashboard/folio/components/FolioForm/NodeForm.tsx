"use client";

import React, { useRef } from "react";

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
import { useModalContext } from "@/components/ui/modal";
import { useFolioFormContext } from "./context/FolioFormContext";
import { NodeContext } from "./context/NodeContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NodeFormSchema,
  iNewNodeSchema,
  iNodeValueSchema,
} from "@/types/nodes";

export const FormSchema = NodeFormSchema;
export type Form = z.infer<typeof FormSchema>;
type Props = {
  node?: iNewNodeSchema;
};
export default function NodeForm(props: Props) {
  const { node } = props;
  const isEditing = !!node;
  const { closeModal } = useModalContext();
  const { addNode, editNode, folio_id } = useFolioFormContext();
  const id = useRef(crypto.randomUUID());
  const nodeForm = useForm<iNewNodeSchema>({
    resolver: zodResolver(NodeFormSchema),
    defaultValues: isEditing
      ? node
      : {
          title: "",
          value: { type: "text", data: "" },
          folio_id,
          id: id.current,
        },
  });

  function onSubmit() {
    const node = nodeForm.getValues();
    console.log(node)
    if(isEditing) {
      editNode(node)
    } else {
      addNode(node);
    }
    closeModal();
  }

  const setNodeValue = (nNode: Omit<iNodeValueSchema, "node_id">) => {
    // @ts-ignore
    nodeForm.setValue("value", { ...nNode, node_id: id.current });
  };

  return (
    <NodeContext.Provider
      value={{
        setNodeValue,
        form: nodeForm,
        node: nodeForm.getValues(),
        isEditing: !!node,
      }}
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
            {!isEditing ? 'Create' : 'Save'}
          </Button>
        </div>
      </Form>
    </NodeContext.Provider>
  );
}
