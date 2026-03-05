import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { blurFade, staggerContainerFast, viewportConfig } from "@/lib/animations";
import SectionTitle from "./SectionTitle";

const technologies = [
  { name: "React", logo: "/images/tech/react.svg" },
  { name: "Next.js", logo: "/images/tech/nextjs.svg" },
  { name: "Node.js", logo: "/images/tech/nodejs.svg" },
  { name: "Python", logo: "/images/tech/python.svg" },
  { name: "AWS", logo: "/images/tech/aws.svg" },
  { name: "Docker", logo: "/images/tech/docker.svg" },
  { name: "MongoDB", logo: "/images/tech/mongodb.svg" },
  { name: "Java", logo: null },
  { name: ".NET", logo: null },
  { name: "Flutter", logo: null },
  { name: "React Native", logo: null },
  { name: "PostgreSQL", logo: null },
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
