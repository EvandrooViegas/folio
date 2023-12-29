"use client"
import { Folio } from "@/types/folio";
import { NewNode } from "@/types/nodes";
import React, { createContext, useContext } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";


type INewFolioFormContext = {
 form: UseFormReturn<Folio>
 addNode: (nNode: NewNode) => void,
 editNode: (nNode: NewNode) => void,
 removeNode: (id: string) => void;
 folio_id: string
};

export const FolioFormContext = createContext({} as INewFolioFormContext);
export function useFolioFormContext() {
  return useContext(FolioFormContext);
}
