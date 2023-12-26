import Icon from "@/components/ui/Icon";
import { iNewNodeSchema } from "@/types/nodes";

import React, { useState } from "react";
import Text from "./Text";
import Gallery from "./Gallery";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/ui/modal";
import NodeForm from "../NodeForm";

type Props = {
  nodes: iNewNodeSchema[];
};
export default function NodeListPreview(props: Props) {
  const { nodes } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<null | iNewNodeSchema>(null)
  const openModal = (n: iNewNodeSchema) => {
    setIsOpen(true);
    setSelectedNode(n)
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      {selectedNode && (
        <Modal isOpen={isOpen} close={closeModal} title="Update a node">
          <NodeForm node={selectedNode} />
        </Modal>
      )}
      {nodes.length > 0 ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  grid-cols-1 gap-4 max-w-[2000px] max-h-[300px]  mx-auto">
          {nodes.map((node, idx) => (
            <div className="flex flex-col gap-3 p-1 text-dimmed" key={idx}>
              <div className="flex items-center gap-1 relative w-full ">
                <span className="font-semibold truncate text-sm">
                  {node.title}
                </span>
                <div className="absolute right-0 top-0 cursor-pointer">
                  <DropdownMenu>
                    <DropdownMenuTrigger />
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => openModal(node)}>
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="overflow-hidden text-clip break-words rounded">
                {node.value.type === "gallery" && (
                  <Gallery gallery={node.value.data} />
                )}

                {node.value.type === "text" && <Text text={node.value.data} />}
              </div>
              <div className="flex items-center gap-1 text-xs border border-dashed w-fit px-2 py-1 rounded-full">
                <Icon name={`node-${node.value.type}`} />
                <span className="font-semibold truncate capitalize">
                  {node.value.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="f-center flex-col ">
          <Icon name="empty" dimmed className="text-3xl" />
          <span className="text-dimmed text-sm font-semibold">No nodes</span>
        </div>
      )}
    </div>
  );
}
