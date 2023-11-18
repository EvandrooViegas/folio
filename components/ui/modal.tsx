"use client"
import React from "react";


export default function Modal({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed z-modal inset-0 bg-black/80 f-center">
      <div className="bg-white p-10 rounded max-h-[90vh] overflow-y-auto md:max-w-[70vw] max-w-[90vw]">{children}</div>
    </div>
  );
}
