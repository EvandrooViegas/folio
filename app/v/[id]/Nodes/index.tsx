import React from "react";
import Node from "./NodeTypes";
import { getNodesByFolioID } from "@/services/nodes";

type Props = {
  id: string
}
export default async function Nodes({ id }: Props) {
  const nodes = await getNodesByFolioID(id)
  console.log(nodes)
  return (
    <div className="flex flex-col gap-8">
      {nodes ? nodes.map((node) => (
        <Node key={node.id} node={node} />
      )) : <div>
        No nodes found</div>}
    </div>
  );
}
