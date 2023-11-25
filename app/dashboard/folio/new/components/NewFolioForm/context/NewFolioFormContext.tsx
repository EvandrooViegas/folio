"use client"
import { Folio } from "@/types/folio";
import { Node } from "@/types/nodes";
import React, { createContext, useContext, useState } from "react";


type INewFolioFormContext = {
  addNode: (nNode: Node) => void;
  folio: Folio
};

const NewFolioFormContext = createContext({} as INewFolioFormContext);
export default function NewFolioFormProvider({
    children
}: {
    children: React.ReactNode
}) {
  const [folio, setFolio] = useState({} as Folio);
  const addNode = (nNode: Node) => {
    setFolio({
      ...folio,
      nodes:  folio.nodes ? [...folio.nodes, nNode] : [nNode], 
    });
  };

  return (
    <NewFolioFormContext.Provider
      value={{ addNode, folio }}
    >
        {children}
    </NewFolioFormContext.Provider>
  );
}

export function useNewFolioFormContext() {
  return useContext(NewFolioFormContext);
}
