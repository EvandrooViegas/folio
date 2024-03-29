import { ITextNodeData } from "@/types/nodes/values/text/iTextNode";
import React from "react";

type Props = {
  text: ITextNodeData;
};

export default function Text(props: Props) {
  const { text: data } = props;
  const rawText = data.text
  if (!rawText) return;
  const maxLetters = 100;
  const text =
    rawText?.length > maxLetters
      ? rawText?.slice(0, maxLetters) + "..."
      : rawText;
  return <p className="text-clip bg-neutral-100 p-3">{text}</p>;
}
