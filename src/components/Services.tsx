import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/animations";
import SectionTitle from "./SectionTitle";

const serviceItems = [
  {
    title: "ERP Solutions",
    desc: "End-to-end enterprise resource planning systems tailored to your industry.",
    icon: "🏢",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
    imageAlt: "Enterprise software icon",
  },
  {
    title: "IT Consulting",
    desc: "Expert IT consulting and advisory services to align technology with your business goals.",
    icon: "⚙️",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    imageAlt: "IT consulting icon",
  },
  {
    title: "Web Development",
    desc: "Modern, responsive websites and web applications that engage your audience.",
    icon: "🌐",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    imageAlt: "Web development icon",
  },
  {
    title: "Mobile Apps",
    desc: "iOS and Android mobile apps that extend your business reach.",
    icon: "📱",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    imageAlt: "Mobile app icon",
  },
  {
    title: "Cloud Solutions",
    desc: "Scalable cloud infrastructure and migration services for modern businesses.",
    icon: "☁️",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    imageAlt: "Cloud solutions icon",
  },
  {
    title: "AI & Automation",
    desc: "Intelligent automation and AI-powered solutions to streamline workflows and boost productivity.",
    icon: "📊",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    imageAlt: "AI and automation icon",
  },
];

const ServiceCard: React.FC<{
  title: string;
  desc: string;
  icon: string;
  image: string;
  imageAlt: string;
  index: number;
}> = ({ title, desc, image, imageAlt, index }) => (
  <motion.div
    className="card card-glow p-6 relative overflow-hidden group"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={viewportConfig}
    transition={{ delay: index * 0.08 }}
    whileHover={{
      y: -8,
      transition: { duration: 0.3 },
    }}
  >
    {/* Hover border glow */}
    <div className="absolute inset-0 rounded-2xl border border-primary-500/0 group-hover:border-primary-500/30 transition-all duration-500" />

    {/* Hover gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/8 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

    <motion.div
      className="mb-4 relative z-10 w-12 h-12"
      whileHover={{ scale: 1.2, rotate: 10 }}
      transition={{ duration: 0.25 }}
    >
      <Image
        src={image}
        alt={imageAlt}
        width={48}
        height={48}
        className="w-12 h-12 object-contain"
        unoptimized
      />
    </motion.div>
    <h3 className="font-bold text-gray-100 text-lg mb-2 relative z-10 group-hover:text-primary-400 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-400 text-sm leading-relaxed relative z-10">
      {desc}
    </p>

    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500 rounded-b-2xl" />
  </motion.div>
);

const Services: React.FC = () => (
  <section id="services" className="section-padding section-dark-alt">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        label="What We Do"
        title="Our Services"
        subtitle="Comprehensive technology solutions to accelerate your digital transformation journey."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceItems.map(({ title, desc, icon, image, imageAlt }, i) => (
          <ServiceCard
            key={title}
            title={title}
            desc={desc}
            icon={icon}
            image={image}
            imageAlt={imageAlt}
            index={i}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Services;
