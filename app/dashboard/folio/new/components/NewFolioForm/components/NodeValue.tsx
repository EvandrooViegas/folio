"use client";

import React, { useState } from "react";
import Text from "./NodeDataForm/Text";
import Gallery from "./NodeDataForm/Gallery";
import { NodeTypes, NodeValue, Node } from "@/types/nodes";
import { types } from "./nodeTypes";
import { ControllerRenderProps } from "react-hook-form";

type Props = {
  field: ControllerRenderProps<Node, "value.data">;
};
export default function NodeValue(props: Props) {
  const [type, setType] = useState<NodeTypes>("text");
  const isSelectedType = (t: NodeTypes) => t === type;
  const { field } = props;
  return (
    <div className="space-y-1">
      <div className="flex flex-wrap gap-1">
        {types.map((type) => (
          <div
            onClick={() => setType(type.name)}
            className={`text-xs font-bold flex rounded-full gap-2 cursor-pointer items-center border px-3 py-1.5 ${
              isSelectedType(type.name) ? "text-primary " : "text-dimmed"
            }`}
            key={type.name}
          >
            <span>{type.name}</span>
            <span>{type.icon}</span>
          </div>
        ))}
      </div>
      <div className="min-w-[500px] ">
        {type === "text" && <Text field={field} />}
        {type === "gallery" && <Gallery />}
      </div>
    </div>
  );
}
