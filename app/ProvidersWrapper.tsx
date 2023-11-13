"use client";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
