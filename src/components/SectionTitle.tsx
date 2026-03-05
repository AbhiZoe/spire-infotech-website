import React from "react";
import { motion } from "framer-motion";
import { blurFade, fadeInUp, staggerContainerSlow, viewportConfig, zoomIn } from "@/lib/animations";

interface SectionTitleProps {
  label: string;
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ label, title, subtitle }) => (
  <motion.div
    className="text-center mb-12"
    variants={staggerContainerSlow}
    initial="hidden"
    whileInView="visible"
    viewport={viewportConfig}
  >
    <motion.span
      className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3"
      variants={blurFade}
    >
      {label}
    </motion.span>
    <motion.h2
      className="section-title zoom-text-trigger"
      variants={zoomIn}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p className="section-subtitle mx-auto" variants={fadeInUp}>
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

export default SectionTitle;
