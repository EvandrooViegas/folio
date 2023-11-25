"use client";

import React, {
  createContext,
  useContext,
  ReactElement,
  useState,
} from "react";
import Text from "./NodeDataForm/Text";
import Gallery from "./NodeDataForm/Gallery";
import { NodeTypes, NodeValue } from "@/types/nodes";
import Icon from "@/components/ui/Icon";

const NodeValueContext = createContext(
  {} as {
    onNodeValueChange: (nValue: NodeValue) => void;
  }
);

export function useNodeValueContext() {
  return useContext(NodeValueContext);
}




const types = [
  { name: "text", icon: <Icon name="node-text" /> },
  { name: "gallery", icon: <Icon name="node-gallery" /> },
] as {
  name: NodeTypes;
  icon: ReactElement;
}[];

export default function NodeValue(props: {
  onNodeValueChange: (nValue: NodeValue) => void;
}) {
  const { onNodeValueChange } = props;
  const [nodeType, setNodeType] = useState<NodeTypes>("text");

  const changeNodeType = (nType: NodeTypes) => {
    setNodeType(nType);
    onNodeValueChange({
      data: null,
      type: nType,
    });
  };
  const isSelectedType = (t: NodeTypes) => t === nodeType;

  return (
    <NodeValueContext.Provider value={{ onNodeValueChange }}>
      <div className="space-y-1">
        <div className="flex flex-wrap gap-1">
          {types.map((type) => (
            <div
              onClick={() => changeNodeType(type.name)}
              className={`flex rounded gap-2 cursor-pointer items-center border px-3 py-1.5 ${
                isSelectedType(type.name)
                  ? "text-primary font-bold"
                  : "text-dimmed"
              }`}
              key={type.name}
            >
              <span className="text-sm ">{type.name}</span>
              <span className="text-sm ">{type.icon}</span>
            </div>
          ))}
        </div>
        <div className="min-w-[500px] ">
          {nodeType === "text" && <Text />}
          {nodeType === "gallery" && <Gallery />}
        </div>
      </div>
    </NodeValueContext.Provider>
  );
}
