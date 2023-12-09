import { iNode } from "@/types/nodes";
import React from "react";
import Node from "./NodeTypes";

type Props = {
  nodes: iNode[];
};
export default function Nodes(props: Props) {
  const { nodes } = props;
  return (
    <div className="flex flex-col gap-8">
      {nodes ? nodes.map((node) => (
        <Node key={node.id} node={node} />
      )) : <div>
        No nodes found</div>}
    </div>
  );
}
