"use client";
import { Input } from "@/components/ui/input";
import { useNodeValueContext } from "../NodeValue";

export default function Text() {
  const { onNodeValueChange } = useNodeValueContext();
  const onChange = (e: any) => {
    onNodeValueChange({
      type: "text",
      data: e?.target?.value || "",
    });
  };
  return <Input  onChange={onChange} />;
}
