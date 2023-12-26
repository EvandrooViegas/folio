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

type Props = {
  field: ControllerRenderProps<Node, "value.data">;
}
export default function Text(props: Props) {
  const { setNodeValue, node } = useNodeContext();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNodeValue({
      type: "text",
      data: e.target.value,
    });
  };
  return (
      <Textarea onChange={onChange} defaultValue={node.value.data} className="h-44 resize-none p-5"  />
  )
    
}
