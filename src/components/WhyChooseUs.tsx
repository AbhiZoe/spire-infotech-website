import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/SectionTitle";
import { whyChooseUsItems } from "@/data/whyChooseUs";

gsap.registerPlugin(ScrollTrigger);

const FLIP_PERSPECTIVE = "800px";

const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-card",
        { rotationX: 90, opacity: 0, transformPerspective: 800 },
        {
          rotationX: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.1,
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
    <section ref={sectionRef} id="why-us" className="section-padding gradient-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Why Spire"
          title="Why Choose Us"
          subtitle="We combine technical excellence with business acumen to deliver solutions that truly make a difference."
        />

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: FLIP_PERSPECTIVE }}
        >
          {whyChooseUsItems.map(({ id, title, description, image, imageAlt }) => (
            <motion.div
              key={id}
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
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
