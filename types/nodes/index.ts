

import { NodeFormSchema } from "@/app/dashboard/folio/new/components/new-folio-form/schemas/node";
import z from "zod"
type Form = z.infer<typeof NodeFormSchema>;
export type NodeTypes = Form["value"]["type"];
export type NodeValue = Form["value"];
export type Node = Form;
