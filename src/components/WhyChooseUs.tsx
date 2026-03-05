import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { staggerContainer, flipInFromTop, FLIP_PERSPECTIVE, viewportConfig } from "@/lib/animations";
import { whyChooseUsItems } from "@/data/whyChooseUs";

const WhyChooseUs: React.FC = () => (
  <section id="why-us" className="section-padding gradient-dark text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        label="Why Spire"
        title="Why Choose Us"
        subtitle="We combine technical excellence with business acumen to deliver solutions that truly make a difference."
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{ perspective: FLIP_PERSPECTIVE }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {whyChooseUsItems.map(({ id, title, description, image, imageAlt }) => (
          <motion.div
            key={id}
            variants={flipInFromTop}
            className="why-card rounded-2xl bg-white/5 border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all duration-300 group overflow-hidden"
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
          >
            {/* Card image */}
            <div className="why-card-image">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="why-card-image-overlay" />
            </div>

            {/* Card body */}
            <div className="p-6">
              <h3 className="font-bold text-white mb-2 group-hover:text-primary-300 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default WhyChooseUs;
