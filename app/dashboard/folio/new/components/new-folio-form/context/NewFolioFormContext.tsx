import { NodeValue } from "@/types/nodes";
import React, { createContext, useContext, useState } from "react";

type Folio = {
  name: string;
  description: string;
  nodes: NodeValue[];
};
type INewFolioFormContext = {
  addNode: (nNode: NodeValue) => void;
};

const NewFolioFormContext = createContext({} as INewFolioFormContext);
export default function NewFolioFormProvider({
    children
}: {
    children: React.ReactNode
}) {
  const [folio, setFolio] = useState({} as Folio);
  const addNode = (nNode: NodeValue) => {
    setFolio({
      ...folio,
      nodes: [...folio?.nodes, nNode],
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
