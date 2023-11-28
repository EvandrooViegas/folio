"use client"
import { Folio } from "@/types/folio";
import React, { createContext, useContext } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";


type INewFolioFormContext = {
 form: UseFormReturn<Folio>
 nodeFieldArray: UseFieldArrayReturn<Folio, "nodes">
};

export const FolioFormContext = createContext({} as INewFolioFormContext);
export function useFolioFormContext() {
  return useContext(FolioFormContext);
}
