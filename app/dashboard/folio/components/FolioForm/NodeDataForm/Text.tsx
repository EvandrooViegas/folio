"use client";
import { Textarea } from "@/components/ui/textarea";
import { useNodeContext } from "../context/NodeContext";
import { ChangeEvent, useRef } from "react";
import _ from "lodash";
import { iTextValueDataSchema } from "@/types/nodes";
import { useNodeValueDataContext } from "./context";
export default function Text() {
  const { setNodeDataValue } = useNodeContext();
  const { initialNodeData } = useNodeValueDataContext<iTextValueDataSchema>()

  const onChange = (e: any) => {
    const nData = {
        text: (e?.target?.value as string)  || "",
        id: initialNodeData.id,
    }
    setNodeDataValue(nData, initialNodeData, "text");
  };
  return (
    <Textarea
      onChange={onChange}
      defaultValue={initialNodeData?.text || ""}
      className="h-44 resize-none p-5"
    />
  );
}
