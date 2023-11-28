"use client"
import { Folio } from "@/types/folio";
import { Node } from "@/types/nodes";
import React, { createContext, useContext } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";


type INewFolioFormContext = {
 form: UseFormReturn<Folio>
 addNode: (nNode: Node) => void
};

export const FolioFormContext = createContext({} as INewFolioFormContext);
export function useFolioFormContext() {
  return useContext(FolioFormContext);
}
