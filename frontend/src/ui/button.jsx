import React from "react";
import { cn } from "./utils";

export function Button({ className = "", ...props }) {
  return (
    <button
      className={cn("btn btn-primary", className)}
      {...props}
    />
  );
}
