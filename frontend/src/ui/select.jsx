import React from "react";
import { cn } from "./utils";

export function Select({ className = "", children, ...props }) {
  return (
    <select
      className={cn("form-input", className)}
      {...props}
    >
      {children}
    </select>
  );
}
