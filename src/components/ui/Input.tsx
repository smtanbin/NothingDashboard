import * as React from "react";
import { cn } from "../utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex w-full h-10 px-4 py-2 bg-white border border-neutral-350 rounded-3xl text-sm text-black placeholder-neutral-500 transition-all duration-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-neutral-200 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
