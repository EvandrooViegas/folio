"use client"
import { Node } from "@/types/nodes";
import React, { createContext, useContext, useState } from "react";

type Folio = {
  name: string;
  description: string;
  nodes: Node[];
};
type INewFolioFormContext = {
  addNode: (nNode: Node) => void;
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
      nodes: folio.nodes?.length ? [...folio?.nodes, nNode] : [nNode], 
    });
  };

  return (
    <NewFolioFormContext.Provider
      value={{ addNode }}
    >
        {children}
    </NewFolioFormContext.Provider>
  );
}

export function useNewFolioFormContext() {
  return useContext(NewFolioFormContext);
}
