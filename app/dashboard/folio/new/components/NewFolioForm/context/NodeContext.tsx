"use client"
import { Node, NodeValue } from "@/types/nodes";
import React, { createContext, useContext } from "react";
import {  UseFieldArrayReturn, UseFormReturn } from "react-hook-form";


type INodeContext = {
  setNodeValue: (nValue: NodeValue) => void
  form: UseFormReturn<Node>
};

export const NodeContext = createContext({} as INodeContext);
export function useNodeContext() {
  return useContext(NodeContext);
}
