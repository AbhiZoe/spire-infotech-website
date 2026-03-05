import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { blurFade, staggerContainerFast, viewportConfig } from "@/lib/animations";
import SectionTitle from "./SectionTitle";

const technologies = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: ".NET", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" },
  { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactnative/reactnative-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
];

const Technologies: React.FC = () => (
  <section id="technologies" className="section-padding section-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        label="Tech Stack"
        title="Technologies We Use"
        subtitle="We leverage the latest and most reliable technologies to build robust solutions."
      />
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        variants={staggerContainerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {technologies.map(({ name, logo }) => (
          <motion.div
            key={name}
            variants={blurFade}
            className="tech-badge flex items-center gap-2"
            whileHover={{
              scale: 1.1,
              y: -4,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.96 }}
          >
            {logo && (
              <Image
                src={logo}
                alt={`${name} logo`}
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
                unoptimized
              />
            )}
            {name}
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Technologies;
