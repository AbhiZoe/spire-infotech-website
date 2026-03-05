import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  fadeInDown,
  scaleIn,
  staggerContainer,
  staggerContainerFast,
  viewportConfig,
} from "@/lib/animations";

/* ── Navbar with scroll-aware blur & shadow ── */

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["About", "Services", "Projects", "Testimonials", "Contact"];

  return (
    <motion.nav
      variants={fadeInDown}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <motion.a
          href="#"
          className="flex items-center gap-2 font-bold text-secondary-800"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
            SI
          </div>
          <span className={scrolled ? "text-secondary-800" : "text-white"}>
            Spire Infotech
          </span>
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`relative transition-colors duration-200 hover:text-primary-500 ${
                scrolled ? "text-gray-600" : "text-white/90"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              whileHover={{ y: -1 }}
            >
              {item}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            className="btn-primary text-sm px-4 py-2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Get in Touch
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <div
            className={`space-y-1.5 ${scrolled ? "text-secondary-800" : "text-white"}`}
          >
            <motion.span
              className="block w-5 h-0.5 bg-current"
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-current"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-current"
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-primary-500 font-medium py-1 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                className="btn-primary text-sm px-4 py-2 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

/* ── Hero with animated gradient background and floating elements ── */

const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center text-white pt-16 overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 gradient-animated"
        style={{ y }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary-500/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-primary-400/15 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
        style={{ opacity }}
      >
        <motion.span
          className="inline-block text-primary-300 font-semibold text-sm uppercase tracking-widest mb-4"
          variants={fadeInDown}
          initial="hidden"
          animate="visible"
        >
          Innovative Software Solutions
        </motion.span>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={fadeInUp} className="block">
            Empowering Businesses
          </motion.span>
          <motion.span
            variants={fadeInUp}
            className="block text-gradient bg-gradient-to-r from-primary-300 to-accent-300 bg-clip-text text-transparent"
          >
            with Smart Technology
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          We build custom ERP systems, web applications, and mobile solutions
          that transform how you work and accelerate your growth.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={staggerContainerFast}
          initial="hidden"
          animate="visible"
        >
          <motion.a
            href="#contact"
            className="btn-primary"
            variants={scaleIn}
            whileHover={{ scale: 1.06, boxShadow: "0 0 30px rgba(31,199,199,0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            Start Your Project
          </motion.a>
          <motion.a
            href="#projects"
            className="btn-ghost"
            variants={scaleIn}
            whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.97 }}
          >
            View Our Work
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <motion.div
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ── Animated counter ── */
const AnimatedCounter: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => {
  return (
    <motion.div className="text-center" variants={scaleIn}>
      <motion.div
        className="text-3xl font-bold text-primary-500 mb-1"
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

/* ── About with parallax and scroll reveal ── */

const About: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.span
              className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3"
              variants={fadeInUp}
            >
              About Us
            </motion.span>
            <motion.h2 className="section-title mb-4" variants={fadeInUp}>
              Your Technology Partner for Growth
            </motion.h2>
            <motion.p
              className="text-gray-600 leading-relaxed mb-4"
              variants={fadeInUp}
            >
              Spire Infotech is a leading software solutions company based in
              Surat, Gujarat, India. We specialize in developing custom
              enterprise software, ERP systems, and digital transformation
              solutions for businesses of all sizes.
            </motion.p>
            <motion.p
              className="text-gray-600 leading-relaxed mb-6"
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
              className="card-gradient p-10 text-white rounded-2xl relative overflow-hidden"
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Background morph blob */}
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
              />
              <h3 className="text-xl font-bold mb-4 relative z-10">
                Our Mission
              </h3>
              <p className="text-white/90 leading-relaxed relative z-10">
                To empower businesses through innovative technology solutions
                that drive efficiency, productivity, and sustainable growth in
                the digital age.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ── Services with card flip / lift animations ── */

const serviceItems = [
  {
    title: "ERP Solutions",
    desc: "End-to-end enterprise resource planning systems tailored to your industry.",
    icon: "🏢",
  },
  {
    title: "Custom Software",
    desc: "Bespoke software applications built to solve your specific business challenges.",
    icon: "⚙️",
  },
  {
    title: "Web Development",
    desc: "Modern, responsive websites and web applications that engage your audience.",
    icon: "🌐",
  },
  {
    title: "Mobile Apps",
    desc: "iOS and Android mobile apps that extend your business reach.",
    icon: "📱",
  },
  {
    title: "Cloud Services",
    desc: "Scalable cloud infrastructure and migration services for modern businesses.",
    icon: "☁️",
  },
  {
    title: "Data Analytics",
    desc: "Turn your data into actionable insights with powerful analytics dashboards.",
    icon: "📊",
  },
];

const ServiceCard: React.FC<{
  title: string;
  desc: string;
  icon: string;
  index: number;
}> = ({ title, desc, icon, index }) => (
  <motion.div
    className="card p-6 relative overflow-hidden group"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={viewportConfig}
    transition={{ delay: index * 0.08 }}
    whileHover={{
      y: -8,
      boxShadow: "0 20px 48px rgba(31,199,199,0.18)",
      transition: { duration: 0.3 },
    }}
  >
    {/* Hover gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-primary-100/0 group-hover:from-primary-50/60 group-hover:to-primary-100/40 transition-all duration-500 rounded-2xl" />

    <motion.div
      className="text-4xl mb-4 relative z-10"
      whileHover={{ scale: 1.2, rotate: 10 }}
      transition={{ duration: 0.25 }}
    >
      {icon}
    </motion.div>
    <h3 className="font-bold text-secondary-800 text-lg mb-2 relative z-10 group-hover:text-primary-600 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed relative z-10">
      {desc}
    </p>

    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500 rounded-b-2xl" />
  </motion.div>
);

const Services: React.FC = () => (
  <section id="services" className="section-padding bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
          What We Do
        </span>
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle mx-auto text-gray-600">
          Comprehensive technology solutions to accelerate your digital
          transformation journey.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceItems.map(({ title, desc, icon }, i) => (
          <ServiceCard
            key={title}
            title={title}
            desc={desc}
            icon={icon}
            index={i}
          />
        ))}
      </div>
    </div>
  </section>
);

/* ── Why Choose Us ── */

const whyItems = [
  {
    title: "Expert Team",
    desc: "Seasoned professionals with expertise across multiple technology stacks.",
  },
  {
    title: "On-Time Delivery",
    desc: "We respect your deadlines and consistently deliver projects on schedule.",
  },
  {
    title: "Quality Assured",
    desc: "Rigorous testing and quality assurance processes for every project.",
  },
  {
    title: "24/7 Support",
    desc: "Round-the-clock support to ensure your systems run smoothly.",
  },
  {
    title: "Competitive Pricing",
    desc: "Enterprise-quality solutions at prices that fit your budget.",
  },
  {
    title: "Long-term Partnership",
    desc: "We build lasting relationships and grow with your business.",
  },
];

const WhyChooseUs: React.FC = () => (
  <section id="why-us" className="section-padding gradient-dark text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <span className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">
          Why Spire
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Why Choose Us
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We combine technical excellence with business acumen to deliver
          solutions that truly make a difference.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {whyItems.map(({ title, desc }) => (
          <motion.div
            key={title}
            variants={fadeInUp}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all duration-300 group"
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
          >
            <div className="w-10 h-10 rounded-lg bg-primary-500/20 group-hover:bg-primary-500/40 flex items-center justify-center mb-4 transition-colors duration-300">
              <motion.div
                className="w-3 h-3 rounded-full bg-primary-400"
                whileHover={{ scale: 1.3 }}
              />
            </div>
            <h3 className="font-bold text-white mb-2 group-hover:text-primary-300 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ── Technologies with animated badges ── */

const technologies = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  ".NET",
  "Flutter",
  "React Native",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
];

const Technologies: React.FC = () => (
  <section id="technologies" className="section-padding bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
          Tech Stack
        </span>
        <h2 className="section-title">Technologies We Use</h2>
        <p className="section-subtitle mx-auto text-gray-600">
          We leverage the latest and most reliable technologies to build robust
          solutions.
        </p>
      </motion.div>
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        variants={staggerContainerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {technologies.map((tech) => (
          <motion.div
            key={tech}
            variants={scaleIn}
            className="px-6 py-3 rounded-full border-2 border-primary-200 text-secondary-700 font-medium text-sm transition-all duration-200 cursor-default"
            whileHover={{
              scale: 1.08,
              borderColor: "#1fc7c7",
              color: "#1fc7c7",
              backgroundColor: "#e8fafa",
              boxShadow: "0 4px 16px rgba(31,199,199,0.2)",
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.96 }}
          >
            {tech}
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ── Projects with image-style zoom and overlay ── */

const projects = [
  {
    title: "TradePro ERP",
    desc: "Comprehensive ERP system for an import/export company with inventory, billing, and compliance modules.",
    tag: "ERP",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    title: "HealthFirst HMS",
    desc: "Hospital management system for a 5-clinic chain with appointments, billing, and EMR.",
    tag: "Healthcare",
    color: "from-green-500/20 to-green-600/10",
  },
  {
    title: "RetailMax Platform",
    desc: "Multi-vendor e-commerce platform with real-time inventory and analytics dashboard.",
    tag: "E-Commerce",
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    title: "LogiTrack App",
    desc: "Mobile logistics tracking app for fleet management and real-time shipment monitoring.",
    tag: "Mobile",
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    title: "FinSmart Dashboard",
    desc: "Financial analytics platform with automated reporting and compliance tracking.",
    tag: "FinTech",
    color: "from-yellow-500/20 to-yellow-600/10",
  },
  {
    title: "EduLearn LMS",
    desc: "Learning management system for corporate training with progress tracking and certification.",
    tag: "EdTech",
    color: "from-teal-500/20 to-teal-600/10",
  },
];

const ProjectCard: React.FC<{
  title: string;
  desc: string;
  tag: string;
  color: string;
  index: number;
}> = ({ title, desc, tag, color, index }) => (
  <motion.div
    className={`card p-6 relative overflow-hidden group bg-gradient-to-br ${color} border border-gray-100`}
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={viewportConfig}
    transition={{ delay: index * 0.08 }}
    whileHover={{
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 48px rgba(0,0,0,0.12)",
      transition: { duration: 0.3 },
    }}
  >
    <motion.span
      className="inline-block text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3"
      whileHover={{ scale: 1.05 }}
    >
      {tag}
    </motion.span>
    <h3 className="font-bold text-secondary-800 text-lg mb-2 group-hover:text-primary-600 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>

    {/* Arrow indicator on hover */}
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
  <section id="projects" className="section-padding bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
          Portfolio
        </span>
        <h2 className="section-title">Our Projects</h2>
        <p className="section-subtitle mx-auto text-gray-600">
          A selection of the impactful solutions we&apos;ve built for our
          clients.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(({ title, desc, tag, color }, i) => (
          <ProjectCard
            key={title}
            title={title}
            desc={desc}
            tag={tag}
            color={color}
            index={i}
          />
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Spire Infotech – Innovative Software Solutions</title>
        <meta
          name="description"
          content="Spire Infotech delivers custom ERP, web and mobile software solutions for businesses across India and globally."
        />
        <meta
          property="og:title"
          content="Spire Infotech – Innovative Software Solutions"
        />
        <meta
          property="og:description"
          content="Custom ERP, web & mobile development for modern businesses."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Technologies />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
