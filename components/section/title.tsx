import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const titleVariants = cva("text-neutral-700", {
  variants: {
    variant: {
      default: "text-neutral-600 font-black",
    },
    size: {
      default: "text-2xl",
      medium: "text-xl",
      sm: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface TitleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof titleVariants> {}

export default function Title({
  className,
  variant,
  size,
  ...props
}: TitleProps) {
  return (
    <h3 className={cn(titleVariants({ variant, size, className }))}>
      {props?.children}
    </h3>
  );
}
