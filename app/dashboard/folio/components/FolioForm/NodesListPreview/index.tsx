import Icon from "@/components/ui/Icon";

import React, { useMemo, useState } from "react";
import Text from "./Text";
import Gallery from "./Gallery";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  dropdownItemTextClassName,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/ui/modal";
import NodeForm from "../NodeForm";
import { iGalleryValueDataSchema, iNodeSchema } from "@/types/nodes";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useFolioFormContext } from "../context/FolioFormContext";
import { Button } from "@/components/ui/button";

type Props = {
  nodes: iNodeSchema[];
};
export default function NodeListPreview(props: Props) {
  const { nodes } = props;
  const filteredNodes = useMemo(() => {
    return nodes.filter(n => !n.wasRemoved)
  }, [nodes])
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<null | iNodeSchema>(null);
  const { removeNode } = useFolioFormContext()
  const openModal = (n: iNodeSchema) => {
    setIsOpen(true);
    setSelectedNode(n);
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
      {filteredNodes.length > 0 ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  grid-cols-1 gap-4 max-w-[2000px] max-h-[300px]  mx-auto">
          {filteredNodes.map((node, idx) => (
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
                      <AlertDialog>
                        <AlertDialogTrigger asChild className="w-full">
                          <button className={dropdownItemTextClassName} >
                          Remove
                          </button>

                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                             If you remove this node, you can still see it by refreshing the page, but all of the changes made until now are going to be lost.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => removeNode(node.id)}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="overflow-hidden text-clip break-words rounded">
                {node.value.type === "gallery" && (
                  <Gallery gallery={node.value.data as iGalleryValueDataSchema[]} />
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
