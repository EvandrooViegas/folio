"use client";
import { iNodeSchema, iNodeTypes, iNodeValueDataSchema } from "@/types/nodes";
import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

type INodeContext = {
  setNodeDataValue: (
    nData: Omit<Omit<Omit<iNodeValueDataSchema, "wasEdited">, "isNew">, "wasRemoved">,
    prevData: iNodeValueDataSchema,
    type: iNodeTypes
  ) => void;
  form: UseFormReturn<iNodeSchema>;
  node: iNodeSchema;
  isEditing: boolean;
};

export const NodeContext = createContext({} as INodeContext);
export function useNodeContext() {
  return useContext(NodeContext);
}
