"use client";

import React, { useState } from "react";
import Text from "./NodeDataForm/Text";
import Video from "./NodeDataForm/Video";
import Gallery from "./NodeDataForm/Gallery";
import { Button } from "@/components/ui/button";
import { ControllerRenderProps } from "react-hook-form";
import { types } from "./nodeTypes"
import { useNodeContext } from "./context/NodeContext"
export default function NodeValue() {
  const { setNodeValue, form, node, isEditing } = useNodeContext();
  const [type, setType] = useState<NodeTypes>(node.value.type);
  const isSelectedType = (t: NodeTypes) => t === type;
  return (
    <div className="space-y-1">
      <div className="flex flex-wrap gap-1">
        {types.map((type, idx) => (
          <Button
            onClick={() => setType(type.name)}
            variant="badge"
            size="badge"
            disabled={isEditing && node.value.type !== type.name}
            isSelected={ isSelectedType(type.name) }
            key={idx}
          >
            <span>{type.name}</span>
            <span>{type.icon}</span>
          </Button>
        ))}
      </div>
      <div className="min-w-[500px] ">
        {type === "text" && <Text />}
        {type === "gallery" && <Gallery />}
        {type === "video" && <Video />}
      </div>
    </div>
  );
}
