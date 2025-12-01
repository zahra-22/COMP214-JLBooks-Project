import React from "react";
import { cn } from "./utils";

export function Label({ className = "", children, ...props }) {
  return (
    <label
      className={cn("form-label", className)}
      {...props}
    >
      {children}
    </label>
  );
}
