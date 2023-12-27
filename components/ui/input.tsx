import * as React from "react";

import { cn } from "@/lib/utils";
import iconsMap, { IconsKeys } from "@/utils/iconsMap";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  fileType?: "image";
  isLoading?: boolean;
  iconName?: IconsKeys;
  onFileUpload?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label = "Choose a file",
      id,
      iconName,
      isLoading,
      fileType = "image",
      disabled = false,
      onFileUpload,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    switch (type) {
      case "file": {
        return (
          <div
            className={`flex items-center gap-2 transition-all px-4 py-1 w-fit rounded text-dimmed  border border-input  ${
              isDisabled ? "opacity-50  cursor-not-allowed" : "opacity-100 cursor-pointer"
            }`}
          >
            <span>{iconName ? iconsMap[iconName] : iconsMap.file}</span>

            <label htmlFor={id} className="text-sm">
              {label}
            </label>
            <input
              id={id}
              type={type}
              disabled={false}
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
