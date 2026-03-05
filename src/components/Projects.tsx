import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/animations";
import SectionTitle from "./SectionTitle";

const projects = [
  {
    title: "TradePro ERP",
    desc: "Comprehensive ERP system for an import/export company with inventory, billing, and compliance modules.",
    tag: "ERP",
    accent: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    image: "/images/projects/cloud-infrastructure.svg",
    imageAlt: "Cloud infrastructure project screenshot",
  },
  {
    title: "HealthFirst HMS",
    desc: "Hospital management system for a 5-clinic chain with appointments, billing, and EMR.",
    tag: "Healthcare",
    accent: "from-green-500/20 to-green-600/10",
    border: "border-green-500/20",
    image: null,
    imageAlt: "",
  },
  {
    title: "RetailMax Platform",
    desc: "Multi-vendor e-commerce platform with real-time inventory and analytics dashboard.",
    tag: "E-Commerce",
    accent: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/20",
    image: "/images/projects/ecommerce-platform.svg",
    imageAlt: "E-commerce platform project screenshot",
  },
  {
    title: "LogiTrack App",
    desc: "Mobile logistics tracking app for fleet management and real-time shipment monitoring.",
    tag: "Mobile",
    accent: "from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/20",
    image: null,
    imageAlt: "",
  },
  {
    title: "FinSmart Dashboard",
    desc: "Financial analytics platform with automated reporting and compliance tracking.",
    tag: "FinTech",
    accent: "from-yellow-500/20 to-yellow-600/10",
    border: "border-yellow-500/20",
    image: "/images/projects/mobile-banking.svg",
    imageAlt: "Mobile banking project screenshot",
  },
  {
    title: "EduLearn LMS",
    desc: "Learning management system for corporate training with progress tracking and certification.",
    tag: "EdTech",
    accent: "from-teal-500/20 to-teal-600/10",
    border: "border-teal-500/20",
    image: null,
    imageAlt: "",
  },
];

const ProjectCard: React.FC<{
  title: string;
  desc: string;
  tag: string;
  accent: string;
  border: string;
  image: string | null;
  imageAlt: string;
  index: number;
}> = ({ title, desc, tag, accent, border, image, imageAlt, index }) => (
  <motion.div
    className={`card p-6 relative overflow-hidden group bg-gradient-to-br ${accent} border ${border}`}
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={viewportConfig}
    transition={{ delay: index * 0.08 }}
    whileHover={{
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3 },
    }}
  >
    {image && (
      <div className="mb-4 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          width={400}
          height={200}
          className="w-full h-36 object-cover"
          unoptimized
        />
      </div>
    )}
    <motion.span
      className="project-tag-dark inline-block mb-3"
      whileHover={{ scale: 1.05 }}
    >
      {tag}
    </motion.span>
    <h3 className="font-bold text-gray-100 text-lg mb-2 group-hover:text-primary-400 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>

    <motion.div
      className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-primary-500/0 group-hover:bg-primary-500 flex items-center justify-center transition-all duration-300"
      initial={{ opacity: 0, x: 10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 + 0.2 }}
    >
      <svg
        className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </motion.div>
  </motion.div>
);

const Projects: React.FC = () => (
  <section id="projects" className="section-padding section-dark-alt">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        label="Portfolio"
        title="Our Projects"
        subtitle="A selection of the impactful solutions we've built for our clients."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(({ title, desc, tag, accent, border, image, imageAlt }, i) => (
          <ProjectCard
            key={title}
            title={title}
            desc={desc}
            tag={tag}
            accent={accent}
            border={border}
            image={image}
            imageAlt={imageAlt}
            index={i}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
