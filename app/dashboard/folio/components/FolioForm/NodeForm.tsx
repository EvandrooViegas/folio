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
import { NodeContext } from "./context/NodeContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NodeFormSchema,
  iNodeSchema,
  iNodeTypes,
  iNodeValueDataSchema,
  iNodeValueSchema,
  iTextNodeValueSchema,
  iTextValueDataSchema,
} from "@/types/nodes";
import isNodeValueDataEqual from "./utils/isNodeValueDataEqual";
import isNodeEqual from "./utils/isNodeEqual";

const FormSchema = NodeFormSchema;

export type Form = z.infer<typeof FormSchema>;
type Props = {
  node?: iNodeSchema;
};

export default function NodeForm(props: Props) {
  const { node: propsNode } = props;
  const isEditing = !!propsNode;
  const { closeModal } = useModalContext();
  const { addNode, editNode, folio_id } = useFolioFormContext();
  const id = useRef(isEditing ? propsNode.id : crypto.randomUUID());
  const isNewNode = !isEditing;

  const initialValue = useRef({
    type: "text",
    node_id: id.current,
    data: {
      id: crypto.randomUUID(),
      isNew: isNewNode,
      wasEdited: false,
      wasRemoved: false,
      text: "",
    } satisfies iTextValueDataSchema,
  } satisfies iTextNodeValueSchema);

  const initialNode = useRef({
    folio_id: folio_id,
    id: id.current,
    isNew: isNewNode,
    title: "",
    wasEdited: false,
    wasRemoved: false,
    value: initialValue.current,
    type: initialValue.current.type,
  } satisfies iNodeSchema);

  const defNode = isEditing ? propsNode : initialNode.current;

  const nodeForm = useForm<iNodeSchema>({
    resolver: zodResolver(NodeFormSchema),
    //@ts-ignore
    defaultValues: defNode,
  });

  function onSubmit() {
    let newNode = nodeForm.getValues();
    const oldNode = defNode;
    const isEqual = isNodeEqual(newNode, oldNode);
    newNode.wasEdited = !isEqual;
    newNode.isNew = isNewNode;
    newNode.type = newNode.value.type;
    if (isEditing) {
      editNode(newNode);
    } else {
      addNode(newNode);
    }
    closeModal();
  }

  const setNodeDataValue = (
    nData: iNodeValueDataSchema,
    prevData: iNodeValueDataSchema,
    type: iNodeTypes
  ) => {
    // @ts-ignore
    let data = nData;

    if (Array.isArray(data)) {
      data = data.map((item, idx) => {
        const prevValue = Array.isArray(prevData) ? prevData[idx] : undefined;
        if (!prevValue) {
          return { ...item, wasEdited: true };
        }
        const isEqual = isNodeValueDataEqual(
          item as unknown as iNodeValueDataSchema,
          prevValue as unknown as iNodeValueDataSchema
        );
        return { ...item, wasEdited: !isEqual };
      });
    } else {
      const isEqual = isNodeValueDataEqual(nData, prevData);
      data.wasEdited = !isEqual;
    }
    const nNodeValue = {
      type,
      data,
      node_id: id.current,
    } satisfies iNodeValueSchema;
    nodeForm.setValue("value", nNodeValue);
  };

  return (
    <NodeContext.Provider
      value={{
        setNodeDataValue,
        form: nodeForm,
        node: nodeForm.getValues(),
        isEditing: !!propsNode,
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
            render={() => (
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
