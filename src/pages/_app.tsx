import type { AppProps } from "next/app";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import "@/styles/globals.css";
import "@/styles/hero.css";

const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: "easeIn" as const } },
};

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={router.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
}
