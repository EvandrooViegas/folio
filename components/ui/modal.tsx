"use client";
import React, { createContext, useContext, useEffect, useRef } from "react";
import Icon from "./Icon";
import SectionTitle from "../section/title";
import showScrollbar from "@/utils/showScrollbar";

type IModalContext = {
  isOpen: boolean;
  closeModal: () => void;
};
export const ModalContext = createContext({} as IModalContext);
export const useModalContext = () => {
  return useContext(ModalContext);
};

export default function Modal({
  isOpen,
  close,
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
  isOpen: boolean,
  close: () => void
}) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const onClose = () => {
    showScrollbar(true)
    close()
  }
  const onScreenClick = (e: any) => {
    const dimentions = modalRef.current?.getBoundingClientRect();
    if (!dimentions) return;

    if (
      e.clientX < dimentions?.left ||
      e.clientX > dimentions?.right ||
      e.clientY < dimentions?.top ||
      e.clientY > dimentions?.bottom
    ) {
      onClose()
    }
  };
  if (!isOpen) return;
  showScrollbar(false)

  return (
    <ModalContext.Provider value={{ closeModal: close, isOpen }}>
      <div
        className="fixed z-modal inset-0 bg-black/40 backdrop-blur-sm f-center"
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
                <button className="cursor-pointer" onClick={onClose}>
                  <Icon name="close" className="" />
                </button>
              </div>
            </div>
            <div className="p-10">{children}</div>
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );
}
