"use client";
import { Input } from "@/components/ui/input";
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
  const { setNodeValue } = useNodeContext();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNodeValue({
      type: "text",
      data: e.target.value,
    });
  };
  return (
      <Input onChange={onChange} />
  )
    
}
