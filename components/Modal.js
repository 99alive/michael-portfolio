import { motion } from "framer-motion";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#2a2140]/70 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative z-50 w-full max-w-4xl rounded-[26px] border-4 border-[#2a2140] bg-[#fffaf0] p-5 shadow-[10px_10px_0_#2a2140]"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[#2a2140] bg-[#ff7a88] font-black text-[#fffaf0] shadow-[3px_3px_0_#2a2140] transition hover:rotate-90"
          aria-label="Close"
        >
          ✕
        </button>
        {children}
      </motion.div>
    </div>
  );
}
