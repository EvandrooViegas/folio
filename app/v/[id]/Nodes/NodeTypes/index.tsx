"use client"
import { iNode, iNodeTypes } from "@/types/nodes";
import Gallery from "./Gallery";
import Video from "./Video";
import Text from "./Text";
import { createContext, useContext } from "react";
import Title from "@/components/section/title";

type Props = {
  node: iNode;
};

type INodeContext = {
  node: iNode;
};
export const NodeContext = createContext({} as INodeContext);
export const useNodeContext = () => {
  return useContext(NodeContext);
};
const mapper = new Map<iNodeTypes, React.ReactNode>([
  ["gallery", <Gallery key="1" />],
  ["text", <Text key="2" />],
  ["video", <Video key="3" />],
]);
export default function Node(props: Props) {
  const { node } = props;
  return (
    <NodeContext.Provider value={{ node }}>
      <div className="space-y-2">
      <Title>{node.title}</Title>
      <div>{mapper.get(node.type)}</div>
      </div>
    </NodeContext.Provider>
  );
}
