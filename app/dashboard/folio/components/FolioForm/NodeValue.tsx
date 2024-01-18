"use client";

import React, { useState } from "react";
import Text from "./NodeDataForm/Text";
import Video from "./NodeDataForm/Video";
import Gallery from "./NodeDataForm/Gallery";
import { Button } from "@/components/ui/button";
import { types } from "./nodeTypes";
import { useNodeContext } from "./context/NodeContext";
import { iNodeTypes, iNodeValueDataSchema } from "@/types/nodes";
import getNodeInitialData from "./utils/getNodeInitialData";
import { NodeValueDataContext } from "./NodeDataForm/context";
export default function NodeValue() {
  const { node, isEditing } = useNodeContext();
  const [type, setType] = useState<iNodeTypes>(node.value.type);
  const [initialNodeData, setInitialNodeData] = useState(
    getNodeInitialData(type, node, isEditing) as iNodeValueDataSchema
  );

  const isSelectedType = (t: iNodeTypes) => t === type;
  const setNodeType = (t: iNodeTypes) => {
    setInitialNodeData(getNodeInitialData(t, node, isEditing));
    setType(t);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-1">
        {types.map((type, idx) => (
          <Button
            onClick={() => setNodeType(type.name)}
            variant="badge"
            size="badge"
            disabled={isEditing && node.value.type !== type.name}
            isSelected={isSelectedType(type.name)}
            key={idx}
          >
            <span>{type.name}</span>
            <span>{type.icon}</span>
          </Button>
        ))}
      </div>
      <div className="min-w-[500px] ">
        <NodeValueDataContext.Provider value={{ initialNodeData }}>
          {type === "text" && <Text />}
          {type === "gallery" && <Gallery />}
          {type === "video" && <Video />}
        </NodeValueDataContext.Provider>
      </div>
    </div>
  );
}
