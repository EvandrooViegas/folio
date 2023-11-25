import iconsMap, { IconsKeys } from "@/utils/iconsMap";
import React, { ButtonHTMLAttributes } from "react";

export default function Icon({
  name,
  className,
  dimmed,
}: {
  name: IconsKeys;
  dimmed?: boolean;
} & ButtonHTMLAttributes<HTMLSpanElement>) {
  if (!name) return;
  return (
    <span className={`${dimmed ? "text-dimmed" : null} ${className || ""}`}>
      {iconsMap[name]}
    </span>
  );
}
