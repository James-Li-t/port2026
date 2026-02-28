"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PdfViewerProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PdfViewer({ pdfUrl, isOpen, onClose }: PdfViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-10 bg-[#333333] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-[#ffbb4d]/30"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#ffbb4d]/10 border-b border-[#ffbb4d]/30">
              <h3 className="text-lg font-medium text-white">Resume</h3>
              <button
                onClick={onClose}
                className="text-white hover:text-[#ffbb4d] transition-colors p-1 rounded-lg hover:bg-[#ffbb4d]/20"
                aria-label="Close viewer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-[#333333] overflow-hidden relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#333333]/90 z-10">
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-12 h-12 border-4 border-[#ffbb4d] border-t-transparent rounded-full animate-spin" />
                    <p className="mt-4 text-gray-300 text-sm">Loading PDF...</p>
                  </motion.div>
                </div>
              )}
              <iframe
                src={pdfUrl}
                className="w-full h-full"
                onLoad={() => setIsLoading(false)}
                title="PDF Viewer"
              />
            </div>

            {/* Footer with download button */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#ffbb4d]/10 border-t border-[#ffbb4d]/30">
              <p className="text-gray-300 text-sm">
                James Li - Mathematics Undergraduate
              </p>
              <motion.button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-[#ffbb4d] text-[#333333] px-6 py-2.5 rounded-lg hover:bg-[#ffe6b3] transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PDF
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}