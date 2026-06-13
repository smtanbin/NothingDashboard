import * as React from "react";
import { cn } from "../utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "nothing-red" | "glass";
  size?: "sm" | "md" | "lg" | "icon";
  circle?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "outline", size = "md", circle = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-450 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          // Variants
          {
            "bg-black text-white hover:bg-neutral-800 border border-transparent shadow-sm": variant === "primary",
            "bg-neutral-200 text-black hover:bg-neutral-300 border border-neutral-300": variant === "secondary",
            "bg-transparent text-black border border-neutral-400 hover:bg-neutral-100": variant === "outline",
            "bg-transparent text-black hover:bg-neutral-150": variant === "ghost",
            "bg-nothing-red text-white hover:bg-red-600 border border-transparent": variant === "nothing-red",
            "bg-white/80 backdrop-blur-md text-black border border-neutral-300 hover:bg-white": variant === "glass",
          },
          // Sizes
          {
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-5 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
            "h-10 w-10 p-0": size === "icon",
          },
          // Rounded corners
          circle ? "rounded-full" : "rounded-3xl",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
