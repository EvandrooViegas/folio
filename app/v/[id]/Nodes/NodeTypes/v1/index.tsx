import { iNode } from "@/types/nodes";
import Gallery from "./Gallery";

type Props = {
  node: iNode;
};
export default function NodeTypeMapperV1(props: Props) {
  const { node } = props;
  switch (node.value.type) {
    case "gallery":
      return <Gallery node={node} />;
    default:
      return "An error occured";
  }
}
