"use client";
import { Textarea } from "@/components/ui/textarea";
import { useNodeContext } from "../context/NodeContext";
import { ChangeEvent, useRef } from "react";
import _ from "lodash";
import { iTextValueDataSchema } from "@/types/nodes";
import { useNodeValueDataContext } from "./context";
export default function Text() {
  const { setNodeValue, node, isEditing } = useNodeContext();
  const { initialNodeData } = useNodeValueDataContext<iTextValueDataSchema>()
  const id = useRef(isEditing ? initialNodeData.id : crypto.randomUUID());

  const onChange = (e: any) => {
    setNodeValue({
      type: "text",
      data: {
        text: e?.target?.value,
        id: id.current,
      } as iTextValueDataSchema,
    });
  };
  return (
    <Textarea
      onChange={onChange}
      defaultValue={initialNodeData?.text || ""}
      className="h-44 resize-none p-5"
    />
  );
}
