import { motion, AnimatePresence } from "framer-motion";

export default function FlashMessage({ message }) {
  const colors = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl ${colors[message.type]}`}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {message.msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
