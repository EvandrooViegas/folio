"use client";
import {
  iNewNodeSchema,
  _iNodeValueDataSchema,
  iNodeValueSchema,
} from "@/types/nodes";
import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

export type SetNewNode = Omit<Omit<iNodeValueSchema, "node_id">, "data"> & {
  data: Omit<Omit<_iNodeValueDataSchema, "isNew">, "wasEdited">;
  node_id?: iNodeValueSchema["node_id"];
};

type INodeContext = {
  setNodeValue: (nValue: SetNewNode) => void;
  form: UseFormReturn<iNewNodeSchema>;
  node: iNewNodeSchema;
  isEditing: boolean;
};

export const NodeContext = createContext({} as INodeContext);
export function useNodeContext() {
  return useContext(NodeContext);
}
