import { iNode } from "@/types/nodes";
import React from "react";
import NodeTypeMapperV1 from "./NodeTypes/v1";

type Props = {
  nodes: iNode[];
};
export default function Nodes(props: Props) {
  const { nodes } = props;
  return (
    <div className="flex flex-col gap-2">
      {nodes.map((node) => (
        <>{node.version === "v1" && <NodeTypeMapperV1 node={node} />}</>
      ))}
    </div>
  );
}
