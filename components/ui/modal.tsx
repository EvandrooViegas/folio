"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import Icon from "./Icon";
import SectionTitle from "../section/title";

export default function Modal({
  isOpen,
  close,
  children,
  title,
}: {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
  title: string;
}) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const onScreenClick = (e: MouseEvent) => {
    const dimentions = modalRef.current?.getBoundingClientRect();
    if (!dimentions) return;

    if (
      e.clientX < dimentions?.left ||
      e.clientX > dimentions?.right ||
      e.clientY < dimentions?.top ||
      e.clientY > dimentions?.bottom
    ) {
      close();
    }
  };
  if (!isOpen) return;
  return (
    <div
      className="fixed z-modal inset-0 bg-black/60 backdrop-blur f-center"
      onClick={onScreenClick}
    >
      <div
        ref={modalRef}
        className="bg-white  rounded max-h-[90vh] overflow-y-auto md:max-w-[70vw] max-w-[90vw]"
      >
        <div className="flex flex-col gap-1">
          <div className="p-3 border-b border-b-neutral-200">
            <div className="flex gap-12 items-center justify-between">
              {title ? (
                <SectionTitle size="medium">{title}</SectionTitle>
              ) : null}
              <button className="cursor-pointer" onClick={close}>

              <Icon  name="close" className="" />
              </button>
            </div>
          </div>
          <div className="p-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
