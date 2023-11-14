import * as React from "react";

import { cn } from "@/lib/utils";
import iconsMap from "@/utils/iconsMap";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  fileType?: "image";
  isLoading?: boolean;
  onFileUpload?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      id,
      isLoading,
      fileType = "image",
      onFileUpload,
      ...props
    },
    ref
  ) => {
    switch (type) {
      case "file": {
        return (
          <div className="flex items-center gap-2 transition-all px-4 py-1 w-fit rounded text-dimmed  border border-input  disabled:opacity-80 disabled:cursor-not-allowed">
            <label htmlFor={id} className="text-sm">
              Choose a file
            </label>
            <input
              id={id}
              type={type}
              disabled={isLoading}
              onInput={onFileUpload}
              className={cn("hidden", className)}
              ref={ref}
              {...props}
            />
            {isLoading && (
              <span className="animate-spin">{iconsMap.loading}</span>
            )}
          </div>
        );
      }

      default: {
        return (
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md outline-none border border-input bg-background px-3 py-2 text-sm file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            disabled={isLoading}
            ref={ref}
            {...props}
          />
        );
      }
    }
  }
);
Input.displayName = "Input";

export { Input };
