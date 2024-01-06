"use client";
import { Textarea } from "@/components/ui/textarea";
import { useNodeContext } from "../context/NodeContext";
import {
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChangeEvent } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { useRef } from "react"
type Props = {
  field: ControllerRenderProps<Node, "value.data">;
}
export default function Text(props: Props) {
  const { setNodeValue, node, isEditing } = useNodeContext();
  const id = useRef(node.value.data?.id || crypto.randomUUID())

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNodeValue({
      type: "text",
      data: {
        text: e?.target?.value,
        id: id.current
      },
    });
  };
  return (
      <Textarea onChange={onChange} defaultValue={node.value.data?.text} className="h-44 resize-none p-5"  />
  )
    
}
