import Icon from "@/components/ui/Icon";
import { ReactElement } from "react";
import { iNodeTypes } from "@/types/nodes";


export const types = [
    { name: "text", icon: <Icon name="node-text" /> },
    { name: "gallery", icon: <Icon name="node-gallery" /> },
    { name: "video", icon: <Icon name="node-video" /> },
  ] as {
    name: iNodeTypes;
    icon: ReactElement;
  }[];
  