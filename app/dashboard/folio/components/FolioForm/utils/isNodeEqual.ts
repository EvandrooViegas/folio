import { def, iNodeSchema, iNodeValueDataSchema, iTextValueDataSchema } from "@/types/nodes";
import removeObjProperties from "@/utils/removeObjProperties";
import _ from "lodash";

type Data = iNodeSchema;
export default function isNodeEqual(data1: Data, data2: Data) {
  const [transformed1, transformed2] =
    removeObjProperties<Data>(
      //@ts-ignore
      Object.keys(def),
      data1,
      data2
    );
  return _.isEqual(transformed1, transformed2);
}
