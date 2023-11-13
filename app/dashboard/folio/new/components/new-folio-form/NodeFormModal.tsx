"use client";

import React from "react";

import Modal from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import SectionTitle from "@/components/section/SectionTitle";
import z from "zod";
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

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  value: z.union([
    z
      .object({
        type: z.literal("text"),
        data: z.string().min(2, {
          message: "Text must have at least 2 characters.",
        }).nullable(),
      }),
      
    z.object({
      type: z.literal("gallery"),
      data: z
        .object({
          url: z.string(),
          title: z
            .string()
            .min(2, {
              message: "Title must have at least 2 characters.",
            })
            .optional(),
          description: z.string().min(2, {
            message: "Description must have at least 2 characters.",
          }),
        })
        .array()
        .nullable(),
    }),
  ]),
});

type Form = z.infer<typeof FormSchema>;
export type NodeTypes = Form["value"]["type"];
export type NodeValue = Form["value"];
export default function NodeFormModal() {
  const form = useForm<Form>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      value: { type: "text", data: "" },
    },
  });

  const onNodeValueChange = (nValue: NodeValue) => {
    form.setValue("value", nValue);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  return (
    <div className="p-4 border border-neutral-200 border-dashed">
      <Modal isOpen={true}>
        <div>
          <SectionTitle>Create a new Node</SectionTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
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
      </Modal>
    </div>
  );
}
