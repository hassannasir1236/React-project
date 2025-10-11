import React from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function FullPageLoader({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 className="w-10 h-10 text-primary" />
      </motion.div>
      <p className="mt-3 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
