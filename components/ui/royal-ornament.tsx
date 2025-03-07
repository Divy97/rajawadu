"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RoyalOrnamentProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
}

export function RoyalOrnament({
  size = "md",
  className,
  animate = true,
}: RoyalOrnamentProps) {
  const sizes = {
    sm: {
      container: "gap-4",
      line: "w-24",
      icon: "text-2xl",
    },
    md: {
      container: "gap-6",
      line: "w-32",
      icon: "text-3xl",
    },
    lg: {
      container: "gap-8",
      line: "w-40",
      icon: "text-4xl",
    },
  };

  return (
    <div className={cn("my-8", className)}>
      <motion.div
        className={cn(
          "flex items-center justify-center",
          sizes[size].container
        )}
      >
        <motion.div
          initial={animate ? { width: 0 } : false}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            sizes[size].line,
            "h-px bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"
          )}
        />
        <motion.div
          initial={animate ? { scale: 0, rotate: -180 } : false}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("text-sweet-orange relative", sizes[size].icon)}
        >
          ❖
          <motion.div
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="absolute inset-0 bg-sweet-orange/10 blur-lg -z-10"
          />
        </motion.div>
        <motion.div
          initial={animate ? { width: 0 } : false}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            sizes[size].line,
            "h-px bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"
          )}
        />
      </motion.div>
    </div>
  );
}
