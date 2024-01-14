"use client";

import React, { useRef } from "react";
import _ from "lodash";
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
import { NodeContext, type SetNewNode } from "./context/NodeContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NodeFormSchema,
  iNodeSchema,
  iNodeValueDataSchema,
  iNodeValueSchema,
  iTextNodeValueSchema,
} from "@/types/nodes";
import isNodeValueDataEqual from "./utils/isNodeValueDataEqual";

const FormSchema = NodeFormSchema;

export type Form = z.infer<typeof FormSchema>;
type Props = {
  node?: iNodeSchema;
};

export default function NodeForm(props: Props) {
  const { node } = props;
  const isEditing = !!node;
  const { closeModal } = useModalContext();
  const { addNode, editNode, folio_id } = useFolioFormContext();
  const id = useRef(crypto.randomUUID());
  const isNewNode = !isEditing;

  const initialValue = useRef({
    type: "text",
    node_id: id.current,
    data: { id: crypto.randomUUID(), isNew: true, wasEdited: false, text: "" },
  } as iNodeValueSchema);

  const initialNode = useRef({
    folio_id: folio_id,
    id: id.current,
    isNew: true,
    title: "",
    wasEdited: false,
    value: initialValue.current,
  } as iNodeSchema);

  const nodeForm = useForm<iNodeSchema>({
    resolver: zodResolver(NodeFormSchema),
    defaultValues: isEditing ? node : initialNode.current,
  });
  const initialData = useRef(
    nodeForm.getValues().value.data as iNodeValueDataSchema
  );

  function onSubmit() {
    let node = nodeForm.getValues();
    const wasEdited = _.isEqual(node, initialNode);
    node.wasEdited = wasEdited;

    if (isEditing) {
      editNode(node);
    } else {
      addNode(node);
    }
    closeModal();
  }

  const setNodeValue = (node: SetNewNode) => {
    // @ts-ignore
    const nNode = node as iNodeValueSchema;
    nNode.data.wasEdited = isNodeValueDataEqual(
      nNode.data as unknown as iNodeValueDataSchema,
      initialData.current
    );
    nNode.node_id = id.current;
    nNode.data.isNew = isNewNode;
    nodeForm.setValue("value", nNode);
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
                <NodeValue />
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
            {!isEditing ? "Create" : "Save"}
          </Button>
        </div>
      </Form>
    </NodeContext.Provider>
  );
}
