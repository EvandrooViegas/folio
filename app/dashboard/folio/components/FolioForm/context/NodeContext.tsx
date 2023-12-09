"use client"
import { iNewNodeSchema, iNodeValueSchema } from "@/types/nodes";
import React, { createContext, useContext } from "react";
import {  UseFieldArrayReturn, UseFormReturn } from "react-hook-form";


type INodeContext = {
  setNodeValue: (nValue: Omit<iNodeValueSchema, "node_id">) => void
  form: UseFormReturn<iNewNodeSchema>
};

export const NodeContext = createContext({} as INodeContext);
export function useNodeContext() {
  return useContext(NodeContext);
}
