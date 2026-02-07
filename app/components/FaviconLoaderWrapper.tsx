"use client";

import { motion, AnimatePresence } from "framer-motion";
import FaviconLoader from "./FaviconLoader";

export default function FaviconLoaderWrapper() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 4 }}
      >
        <FaviconLoader />
      </motion.div>
    </AnimatePresence>
  );
}
