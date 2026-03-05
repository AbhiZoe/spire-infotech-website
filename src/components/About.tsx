"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AnimatedCounter: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-3xl font-bold text-primary-400 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </motion.div>
  );
};

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="section-padding section-dark overflow-hidden opacity-0 translate-y-24 transition-all duration-700"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">
              About Us
            </span>

            <h2 className="section-title mb-5">
              Your Technology Partner for Growth
            </h2>

            <p className="text-gray-400 leading-relaxed mb-4">
              Spire Infotech is a leading software solutions company based in
              Surat, Gujarat, India. We specialize in developing custom
              enterprise software, ERP systems, and digital transformation
              solutions for businesses of all sizes.
            </p>

            <p className="text-gray-400 leading-relaxed mb-6">
              With over a decade of experience, our team of skilled developers
              and consultants delivers innovative, scalable, and reliable
              technology solutions tailored to your unique business needs.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6">
              <AnimatedCounter value="10+" label="Years Experience" />
              <AnimatedCounter value="200+" label="Projects Delivered" />
              <AnimatedCounter value="50+" label="Happy Clients" />
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="Spire Infotech team"
                width={600}
                height={450}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default About;