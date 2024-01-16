"use client";
import {
  iNodeSchema,
  iNodeValueDataSchema,
  iNodeValueSchema,
} from "@/types/nodes";
import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

export type SetNewNode = Omit<Omit<iNodeValueSchema, "node_id">, "data"> & {
  data: Omit<Omit<iNodeValueDataSchema, "isNew">, "wasEdited">;
  node_id?: iNodeValueSchema["node_id"];
};

type INodeContext = {
  setNodeValue: (nValue: SetNewNode) => void;
  form: UseFormReturn<iNodeSchema>;
  node: iNodeSchema;
  isEditing: boolean;
};

export const NodeContext = createContext({} as INodeContext);
export function useNodeContext() {
  return useContext(NodeContext);
}
