import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "./SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "TradePro ERP",
    desc: "Comprehensive ERP system for an import/export company with inventory, billing, and compliance modules.",
    tag: "ERP",
    accent: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=400&q=80",
    imageAlt: "Business analytics dashboard",
  },
  {
    title: "HealthFirst HMS",
    desc: "Hospital management system for a 5-clinic chain with appointments, billing, and EMR.",
    tag: "Healthcare",
    accent: "from-green-500/20 to-green-600/10",
    border: "border-green-500/20",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&h=400&q=80",
    imageAlt: "Healthcare management system",
  },
  {
    title: "RetailMax Platform",
    desc: "Multi-vendor e-commerce platform with real-time inventory and analytics dashboard.",
    tag: "E-Commerce",
    accent: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/20",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&h=400&q=80",
    imageAlt: "E-commerce platform",
  },
  {
    title: "LogiTrack App",
    desc: "Mobile logistics tracking app for fleet management and real-time shipment monitoring.",
    tag: "Mobile",
    accent: "from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/20",
    image: "https://images.unsplash.com/photo-1526628953301-3cd97b1aaede?auto=format&fit=crop&w=800&h=400&q=80",
    imageAlt: "Mobile logistics tracking app",
  },
  {
    title: "FinSmart Dashboard",
    desc: "Financial analytics platform with automated reporting and compliance tracking.",
    tag: "FinTech",
    accent: "from-yellow-500/20 to-yellow-600/10",
    border: "border-yellow-500/20",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&h=400&q=80",
    imageAlt: "Financial analytics dashboard",
  },
  {
    title: "EduLearn LMS",
    desc: "Learning management system for corporate training with progress tracking and certification.",
    tag: "EdTech",
    accent: "from-teal-500/20 to-teal-600/10",
    border: "border-teal-500/20",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&h=400&q=80",
    imageAlt: "E-learning management system",
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
    className={`project-card card p-6 relative overflow-hidden group bg-gradient-to-br ${accent} border ${border}`}
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

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { scale: 0.8, rotation: -5, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.4)",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section-padding section-dark-alt">
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
};

export default Projects;
