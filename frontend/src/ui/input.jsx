import React from "react";
import { cn } from "./utils";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={cn("form-input", className)}
      {...props}
    />
  );
}
