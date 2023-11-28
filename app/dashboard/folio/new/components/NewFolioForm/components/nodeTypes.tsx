import Icon from "@/components/ui/Icon";
import { useNodeContext } from "../context/NodeContext";
import { useFolioFormContext } from "../context/FolioFormContext";
import { NodeTypes } from "@/types/nodes";
import { ReactElement } from "react";


export const types = [
    { name: "text", icon: <Icon name="node-text" /> },
    { name: "gallery", icon: <Icon name="node-gallery" /> },
  ] as {
    name: NodeTypes;
    icon: ReactElement;
  }[];
  