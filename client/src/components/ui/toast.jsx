import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "fixed top-5 right-5 flex items-center gap-2 rounded-md px-4 py-3 shadow-lg transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-white",
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        warning: "bg-yellow-500 text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function Toast({ message, variant = "default", show, onClose }) {
  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={cn(toastVariants({ variant }))}>
      <span>{message}</span>
    </div>
  );
}
