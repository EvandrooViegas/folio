"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NodeValue from "./NodeValue";
import z from "zod";
import { NodeValue as INodeValue, NodeFormSchema } from "@/types/nodes";
import { useNewFolioFormContext } from "../context/NewFolioFormContext";

const FormSchema = NodeFormSchema

type Form = z.infer<typeof FormSchema>;

export default function NodeFormModal() {
  const form = useForm<Form>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      value: { type: "text", data: "" },
    },
  });
  const { addNode } = useNewFolioFormContext()
  const onNodeValueChange = (nValue: INodeValue) => {
    form.setValue("value", nValue);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addNode(data)
  }
  return (
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="This is your public folio display title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="value"
                render={() => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <NodeValue onNodeValueChange={onNodeValueChange} />
                  </FormItem>
                )}
              />
              <Button type="submit" size={"sm"} className="mt-4">
                Create
              </Button>
            </form>
          </Form>
        </div>
  );
}
