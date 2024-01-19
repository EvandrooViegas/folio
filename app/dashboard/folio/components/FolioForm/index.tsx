"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionTitle from "@/components/section/title";
import NodeForm from "./NodeForm";
import { useRef, useState } from "react";
import Modal from "@/components/ui/modal";
import { Folio, FolioSchema, iCompleteFolio } from "@/types/folio";
import NodeListPreview from "./NodesListPreview";
import { FolioFormContext } from "./context/FolioFormContext";
import { createOrUpdateNodes } from "@/services/nodes";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { iNodeSchema } from "@/types/nodes";
import { transformNodes } from "./transformNodes";
import { createOrUpdateFolio } from "@/services/folio";

type Props = {
  
  folio?: iCompleteFolio;
};
export default function FolioForm(props?: Props) {
  const { folio } = props || {};
  const isEditing = !!folio;
  const folioNodes = folio?.nodes;

  const defaultNodes = folioNodes
    ? transformNodes(folioNodes)
    : ([] as iNodeSchema[]);
  const [nodes, setNodes] = useState<iNodeSchema[]>(defaultNodes);
  const folioID = useRef(isEditing ? folio.id : crypto.randomUUID());
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<Folio>({
    resolver: zodResolver(FolioSchema),
    //@ts-ignore
    defaultValues: !isEditing
      ? {
          name: "",
          description: "",
          nodes: defaultNodes,
          id: folioID.current,
        }
      : {
          ...folio,
          nodes: defaultNodes,
        },
  });
  const router = useRouter();
  const nodesFieldArr = useFieldArray({
    control: form.control,
    name: "nodes",
  });
  const [isOpen, setIsOpen] = useState(false);

  const setFormNode = (nNodes: iNodeSchema[]) => {
    console.log(nNodes)
    setNodes(nNodes);
    nodesFieldArr.replace(nNodes);
  };
  const addNode = (nNode: iNodeSchema) => {
    const nNodes = [nNode, ...nodes];
    setFormNode(nNodes);
  };
  const editNode = (nNode: iNodeSchema) => {
    const nNodes = nodes.map((n) => (n.id === nNode.id ? nNode : n));
    setFormNode(nNodes);
  };

  const removeNode = (id: string) => {
    const nNodes = nodes.map((n) =>
      n.id === id ? ({ ...n, wasRemoved: true } as iNodeSchema) : n
    );
    setFormNode(nNodes);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  async function onSubmit(data: Folio) {
    setIsLoading(true);

    await createOrUpdateFolio(data, isEditing);
    console.log(nodes)
    await createOrUpdateNodes(nodes);

    toast.success(`Folio ${isEditing ? "Edited" : "Created"} successfully!`);

    router.push("/dashboard");
    setIsLoading(false);
  }

  return (
    <FolioFormContext.Provider
      value={{ form, addNode, editNode, removeNode, folio_id: folioID.current }}
    >
      <div className=" w-full">
        <Modal isOpen={isOpen} close={closeModal} title="Create a new Node">
          <NodeForm />
        </Modal>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <SectionTitle>
              {isEditing ? `Update Your Folio` : `Create a New Folio`}
            </SectionTitle>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="This is your public folio display name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your new folio"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nodes"
              render={() => (
                <FormItem>
                  <div className="flex gap-2 items-center justify-between mb-2">
                    <FormLabel>Nodes</FormLabel>
                    <Button
                      icon="more"
                      size="sm"
                      variant="outline"
                      onClick={openModal}
                    >
                      Create a new node
                    </Button>
                  </div>
                  <div className="p-4 border border-input border-dashed rounded overflow-y-auto">
                    <NodeListPreview nodes={nodes} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="private"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <FormLabel className="text-base">Private</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" isLoading={isLoading}>
              {isEditing ? "Save Changes" : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </FolioFormContext.Provider>
  );
}
