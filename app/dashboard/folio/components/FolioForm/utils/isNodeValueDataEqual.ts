import { iNodeValueDataSchema, iTextValueDataSchema } from "@/types/nodes";
import { def } from "@/types/nodes/values";
import removeObjProperties from "@/utils/removeObjProperties";
import _ from "lodash";

type Data = iNodeValueDataSchema;
export default function isNodeValueDataEqual(data1: Data, data2: Data) {
  const [transformed1, transformed2] =
    removeObjProperties<Data>(
      //@ts-ignore
      Object.keys(def),
      data1,
      data2
    );
  return _.isEqual(transformed1, transformed2);
}
