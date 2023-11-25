import Icon from "@/components/ui/Icon";
import { Node } from "@/types/nodes";
import Image from "next/image";
import React from "react";
import Text from "./Text";
import Gallery from "./Gallery";

type Props = {
  nodes: Node[];
};
export default function NodeListPreview(props: Props) {
  const { nodes } = props;
  return (
    <div>
      {nodes ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  grid-cols-1 gap-4 max-w-[2000px] max-h-[300px]  mx-auto">
          {nodes.map((node) => (
            <div
              className="flex flex-col gap-1 p-1 text-dimmed"
              key={node.title}
            >
              <div className="flex items-center gap-1">
                <Icon name={`node-${node.value.type}`} />
                <span className="font-semibold truncate">{node.title}</span>
              </div>
              <div className="overflow-hidden text-clip break-words rounded">
                {node.value.type === "gallery" && (
                  <Gallery gallery={node.value.data} />
                )}

                {node.value.type === "text" && (
                  <Text text={node.value.data} />
                )}
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
