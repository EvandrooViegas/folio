"use client";
import { Textarea } from "@/components/ui/textarea";
import { useNodeContext } from "../context/NodeContext";
import { ChangeEvent, useRef } from "react";
import _ from "lodash";
import { iTextValueDataSchema } from "@/types/nodes";
export default function Text() {
  const { setNodeValue, node, isEditing } = useNodeContext();
  const nodeData = node.value.data as iTextValueDataSchema;
  const id = useRef(isEditing ? nodeData.id : crypto.randomUUID());

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
      defaultValue={nodeData?.text || ""}
      className="h-44 resize-none p-5"
    />
  );
}
