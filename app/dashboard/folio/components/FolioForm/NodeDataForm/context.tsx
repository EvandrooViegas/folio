import { iGalleryValueDataSchema, iNodeValueDataSchema, iTextValueDataSchema, iVideoValueDataSchema } from "@/types/nodes";
import { createContext, useContext } from "react";

type Context = {
    initialNodeData: iNodeValueDataSchema
}
export const NodeValueDataContext = createContext<Context>({} as Context)
export function useNodeValueDataContext<T>()  {
    return useContext(NodeValueDataContext) as {  initialNodeData: T }
}       