import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  blurFade,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  scaleIn,
  staggerContainerFast,
  viewportConfig,
  zoomIn,
} from "@/lib/animations";

const AnimatedCounter: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => {
  return (
    <motion.div className="text-center" variants={scaleIn}>
      <motion.div
        className="text-3xl font-bold text-primary-400 mb-1"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportConfig}
        transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
      >
        {value}
      </motion.div>
      <div className="text-sm text-gray-500">{label}</div>
    </motion.div>
  );
};

const About: React.FC = () => {
  return (
    <motion.section
      id="about"
      className="section-padding section-dark overflow-hidden"
      variants={blurFade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.span
              className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3"
              variants={blurFade}
            >
              About Us
            </motion.span>
            <motion.h2
              className="section-title mb-4 zoom-text-trigger"
              variants={zoomIn}
            >
              Your Technology Partner for Growth
            </motion.h2>
            <motion.p
              className="text-gray-400 leading-relaxed mb-4"
              variants={fadeInUp}
            >
              Spire Infotech is a leading software solutions company based in
              Surat, Gujarat, India. We specialize in developing custom
              enterprise software, ERP systems, and digital transformation
              solutions for businesses of all sizes.
            </motion.p>
            <motion.p
              className="text-gray-400 leading-relaxed mb-6"
              variants={fadeInUp}
            >
              With over a decade of experience, our team of skilled developers
              and consultants delivers innovative, scalable, and reliable
              technology solutions tailored to your unique business needs.
            </motion.p>
            <motion.div
              className="grid grid-cols-3 gap-6"
              variants={staggerContainerFast}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {[
                { value: "10+", label: "Years of Experience" },
                { value: "200+", label: "Projects Delivered" },
                { value: "50+", label: "Happy Clients" },
              ].map(({ value, label }) => (
                <AnimatedCounter key={label} value={value} label={label} />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <Image
                src="/images/about/team.svg"
                alt="Spire Infotech team"
                width={600}
                height={450}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
