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
      <div className="bg-white p-10 rounded-lg">{children}</div>
    </div>
  );
}
