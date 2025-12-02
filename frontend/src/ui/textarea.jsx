import React from "react";
import { cn } from "./utils";

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={cn("form-input textarea-input", className)}
      {...props}
    />
  );
}
