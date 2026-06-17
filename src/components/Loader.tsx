import { motion, AnimatePresence } from 'motion/react';

export function Loader({ loading }: { loading: boolean }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }} 
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }} 
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative">
            {/* Glowing rings */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 rounded-full border border-indigo-500/30 border-t-indigo-500"
            ></motion.div>
            <motion.div 
              animate={{ rotate: -360 }} 
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full border border-purple-500/30 border-b-purple-500"
            ></motion.div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 0.5 }}
              className="text-4xl font-black text-white px-6 py-4 glass rounded-2xl relative z-10"
            >
              MB<span className="text-indigo-400">.</span>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-sm font-mono text-gray-400 tracking-[0.2em] uppercase"
          >
            Initializing Protocol
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
