"use client";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      <ToastContainer />
      {children}
    </>
  );
}
