"use client"
import { Folio } from "@/types/folio";
import { iNodeSchema } from "@/types/nodes";
import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";


type INewFolioFormContext = {
 form: UseFormReturn<Folio>
 addNode: (nNode: iNodeSchema) => void,
 editNode: (nNode: iNodeSchema) => void,
 removeNode: (id: string) => void;
 folio_id: string
};

export const FolioFormContext = createContext({} as INewFolioFormContext);
export function useFolioFormContext() {
  return useContext(FolioFormContext);
}
