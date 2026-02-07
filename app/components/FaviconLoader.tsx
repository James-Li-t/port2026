"use client";

import { motion } from "framer-motion";

export default function FaviconLoader() {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-b from-cyan-50 to-amber-100"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="relative w-24 h-24">
          {/* Main favicon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ rotate: 0 }}
            animate={{ rotate: 720 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <svg
              width="50%"
              height="50%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
            <image href="/favicon.ico"/>
            </svg>
          </motion.div>

          {/* Inner spinning ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#ffe6b3]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid transparent",
                borderTopColor: "#ffbb4d",
                borderBottomColor: "#ffd580",
              }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
          </motion.div>

          {/* Outer decorative ring */}
          <motion.div
            className="absolute -inset-4 rounded-full border-2 border-[#ffbb4d]/30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: "3px solid transparent",
                borderStyle: "dashed",
                borderTopColor: "#ffbb4d",
                borderBottomColor: "#ffe6b3",
                borderLeftColor: "#ffd580",
                borderRightColor: "#ffbb4d",
              }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-16 text-[#666666] text-lg font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        Loading...
      </motion.div>
    </motion.div>
  );
}
