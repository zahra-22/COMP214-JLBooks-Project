import React from "react";
import { cn } from "./utils";

export function Card({ className = "", children, ...props }) {
  return (
    <div className={cn("card", className)} {...props}>
      {children}
    </div>
  );
}
