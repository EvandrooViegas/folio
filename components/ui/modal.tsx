"use client"
import React, { useEffect, useRef } from "react";

export default function Modal({
  isOpen,
  close,
  children,
}: {
  isOpen: boolean;
  close: () => void
  children: React.ReactNode;
}) {
  const modalRef = useRef<HTMLDivElement | null>(null)

  const onScreenClick = (e: MouseEvent) => {
    const dimentions = modalRef.current?.getBoundingClientRect()
    if(!dimentions) return 
    if(
      e.clientX < dimentions?.left ||
      e.clientX > dimentions?.right ||
      e.clientY < dimentions?.top ||
      e.clientY > dimentions?.bottom 
    ) {
      console.log("close")
      close()
    }
  }
  useEffect(() => {
    window.addEventListener("click", onScreenClick)
  return () => {
    window.removeEventListener("click", onScreenClick)
  }
  }, [])
  if(!isOpen) return null 
  return (
    <div  className="fixed z-modal inset-0 bg-black/80 f-center">
      <div ref={modalRef} className="bg-white p-10 rounded max-h-[90vh] overflow-y-auto md:max-w-[70vw] max-w-[90vw]">{children}</div>
    </div>
  );
}
