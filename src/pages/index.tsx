import React, { useEffect, useRef, useState, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  zoomIn,
  blurFade,
  slideInFromBottom,
  viewportConfig,
} from "@/lib/animations";

/* ── Particle canvas background for Hero ── */
const PARTICLE_COUNT = 90;
const MAX_DIST = 140;
const PARTICLE_SPEED = 0.45;
const PARTICLE_SIZE_MAX = 1.8;
const PARTICLE_SIZE_MIN = 0.6;
const PARTICLE_OPACITY_MAX = 0.55;
const PARTICLE_OPACITY_MIN = 0.2;
const LINE_ALPHA_FACTOR = 0.28;

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * PARTICLE_SPEED,
        vy: (Math.random() - 0.5) * PARTICLE_SPEED,
        size: Math.random() * PARTICLE_SIZE_MAX + PARTICLE_SIZE_MIN,
        opacity: Math.random() * PARTICLE_OPACITY_MAX + PARTICLE_OPACITY_MIN,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * LINE_ALPHA_FACTOR;
            ctx.strokeStyle = `rgba(31, 199, 199, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `rgba(31, 199, 199, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
};

/* ── Typewriter text component ── */
/** Delay between each typed character in milliseconds */
const CHAR_DELAY_MS = 65;
/** Delay before the typewriter starts (allows entry animation to settle) */
const TYPEWRITER_START_DELAY_MS = 600;
/**
 * Approximate time (seconds) for both hero lines to finish typing:
 * start_delay + line1_chars * char_delay + line2_chars * char_delay
 * ≈ 0.6s + 21*0.065s + 21*0.065s ≈ 3.3s → 3.5s with buffer
 */
const HERO_TYPING_DONE_S = 3.5;

/** Scroll distance (px) over which the quote zooms from 1× to 5× */
const QUOTE_ZOOM_SCROLL_RANGE = 500;
/** Scroll distance (px) over which the quote fades from fully visible to hidden */
const QUOTE_FADE_SCROLL_RANGE = 350;

interface TypewriterTextProps {
  text: string;
  charDelay?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  charDelay = CHAR_DELAY_MS,
  delay = 0,
  className = "",
  showCursor = true,
  onComplete,
}) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setDone(true);
          onCompleteRef.current?.();
        }
      }, charDelay);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, charDelay, delay]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && (
        <span
          className={`inline-block w-0.5 h-[1em] bg-primary-400 ml-0.5 align-middle ${
            done ? "animate-cursor-blink" : ""
          }`}
          aria-hidden="true"
        />
      )}
    </span>
  );
};

/* ── Zoom Section Title component ── */
interface ZoomTitleProps {
  label: string;
  title: string;
  subtitle?: string;
}

const ZoomSectionTitle: React.FC<ZoomTitleProps> = ({ label, title, subtitle }) => (
  <motion.div
    className="text-center mb-12"
    variants={staggerContainerSlow}
    initial="hidden"
    whileInView="visible"
    viewport={viewportConfig}
  >
    <motion.span
      className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3"
      variants={blurFade}
    >
      {label}
    </motion.span>
    <motion.h2
      className="section-title zoom-text-trigger"
      variants={zoomIn}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p className="section-subtitle mx-auto" variants={fadeInUp}>
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

/* ── Hero with animated canvas background ── */
const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [line2Started, setLine2Started] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { scrollY } = useScroll();
  const handleLine1Complete = useCallback(() => setLine2Started(true), []);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Epic quote zoom effect: scale 1→5, opacity 1→0, blur 0→8px
  const quoteScale = useTransform(scrollY, [0, QUOTE_ZOOM_SCROLL_RANGE], [1, 5]);
  const quoteOpacity = useTransform(scrollY, [0, QUOTE_FADE_SCROLL_RANGE], [1, 0]);
  const quoteBlur = useTransform(
    scrollY,
    [0, QUOTE_ZOOM_SCROLL_RANGE],
    ["blur(0px)", "blur(8px)"]
  );

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center text-white pt-20 overflow-hidden"
      style={{ background: "#0F1419" }}
    >
      {/* Particle canvas */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <ParticleCanvas />
      </motion.div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/60 via-transparent to-secondary-900/80 pointer-events-none" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl pointer-events-none"
        animate={{ x: [0, 25, 0], y: [0, -18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-16 w-96 h-96 rounded-full bg-primary-400/8 blur-3xl pointer-events-none"
        animate={{ x: [0, -18, 0], y: [0, 22, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
        style={{ opacity }}
      >
        <motion.span
          className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-6 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10"
          variants={blurFade}
          initial="hidden"
          animate="visible"
        >
          Innovative Software Solutions
        </motion.span>

        {/* Epic quote zoom wrapper */}
        <motion.div
          className="zoom-text-trigger mb-6"
          style={{
            scale: quoteScale,
            opacity: quoteOpacity,
            filter: quoteBlur,
            transformOrigin: "center center",
          }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-glow-pulse">
            <motion.span
              className="block text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <TypewriterText
                text="Empowering Businesses"
                charDelay={CHAR_DELAY_MS}
                delay={TYPEWRITER_START_DELAY_MS}
                showCursor={!line2Started}
                onComplete={handleLine1Complete}
              />
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: line2Started ? 1 : 0, y: line2Started ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <TypewriterText
                text="with Smart Technology"
                charDelay={CHAR_DELAY_MS}
                delay={0}
                showCursor={line2Started}
              />
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: HERO_TYPING_DONE_S }}
        >
          We build custom ERP systems, web applications, and mobile solutions
          that transform how you work and accelerate your growth.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: HERO_TYPING_DONE_S + 0.3 }}
        >
          <motion.a
            href="#contact"
            className="btn-primary"
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 30px rgba(31,199,199,0.45)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Start Your Project
          </motion.a>
          <motion.a
            href="#projects"
            className="btn-ghost"
            whileHover={{
              scale: 1.04,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
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
          <div className="w-6 h-10 border-2 border-primary-500/40 rounded-full flex items-start justify-center p-1">
            <motion.div
              className="w-1.5 h-1.5 bg-primary-400 rounded-full"
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

/* ── About section ── */
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
            <motion.h2 className="section-title mb-4 zoom-text-trigger" variants={zoomIn}>
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
              className="card-gradient p-10 text-white rounded-2xl relative overflow-hidden"
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
              />
              <div className="relative z-10 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/images/about/team.svg"
                  alt="Spire Infotech team"
                  width={480}
                  height={320}
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
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
    </motion.section>
  );
};

/* ── Services section ── */
const serviceItems = [
  {
    title: "Web Development",
    desc: "Modern, responsive websites and web applications that engage your audience.",
    icon: "/images/services/web-development.svg",
  },
  {
    title: "Mobile Apps",
    desc: "iOS and Android mobile apps that extend your business reach.",
    icon: "/images/services/mobile-app.svg",
  },
  {
    title: "IT Consulting",
    desc: "Strategic technology consulting to align IT with your business objectives.",
    icon: "/images/services/it-consulting.svg",
  },
  {
    title: "Cloud Solutions",
    desc: "Scalable cloud infrastructure and migration services for modern businesses.",
    icon: "/images/services/cloud-solutions.svg",
  },
  {
    title: "AI & Automation",
    desc: "Intelligent automation and AI-driven solutions to boost operational efficiency.",
    icon: "/images/services/ai-automation.svg",
  },
  {
    title: "Enterprise Software",
    desc: "Bespoke enterprise software applications built to solve your specific business challenges.",
    icon: "/images/services/enterprise-software.svg",
  },
];

const ServiceCard: React.FC<{
  title: string;
  desc: string;
  icon: string;
  index: number;
}> = ({ title, desc, icon, index }) => (
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
      className="text-4xl mb-4 relative z-10"
      whileHover={{ scale: 1.2, rotate: 10 }}
      transition={{ duration: 0.25 }}
    >
      <Image src={icon} alt={title} width={48} height={48} className="w-12 h-12 object-contain" />
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
      <ZoomSectionTitle
        label="What We Do"
        title="Our Services"
        subtitle="Comprehensive technology solutions to accelerate your digital transformation journey."
      />
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
      <ZoomSectionTitle
        label="Why Spire"
        title="Why Choose Us"
        subtitle="We combine technical excellence with business acumen to deliver solutions that truly make a difference."
      />

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
            variants={slideInFromBottom}
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

/* ── Technologies section ── */
const technologies = [
  { name: "React", logo: "/images/tech/react.svg" },
  { name: "Next.js", logo: "/images/tech/nextjs.svg" },
  { name: "Node.js", logo: "/images/tech/nodejs.svg" },
  { name: "Python", logo: "/images/tech/python.svg" },
  { name: "AWS", logo: "/images/tech/aws.svg" },
  { name: "Docker", logo: "/images/tech/docker.svg" },
  { name: "MongoDB", logo: "/images/tech/mongodb.svg" },
  { name: "Java" },
  { name: ".NET" },
  { name: "Flutter" },
  { name: "React Native" },
  { name: "PostgreSQL" },
];

const Technologies: React.FC = () => (
  <section id="technologies" className="section-padding section-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ZoomSectionTitle
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
        {technologies.map((tech) => (
          <motion.div
            key={tech.name}
            variants={blurFade}
            className="tech-badge flex items-center gap-2"
            whileHover={{
              scale: 1.1,
              y: -4,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.96 }}
          >
            {tech.logo && (
              <Image
                src={tech.logo}
                alt={`${tech.name} logo`}
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
            )}
            {tech.name}
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ── Projects section ── */
const projects = [
  {
    title: "RetailMax Platform",
    desc: "Multi-vendor e-commerce platform with real-time inventory and analytics dashboard.",
    tag: "E-Commerce",
    accent: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/20",
    image: "/images/projects/ecommerce-platform.svg",
  },
  {
    title: "FinSmart Dashboard",
    desc: "Mobile banking application with secure transactions, account management, and financial analytics.",
    tag: "FinTech",
    accent: "from-yellow-500/20 to-yellow-600/10",
    border: "border-yellow-500/20",
    image: "/images/projects/mobile-banking.svg",
  },
  {
    title: "CloudOps Suite",
    desc: "Cloud infrastructure management platform with automated scaling, monitoring, and cost optimization.",
    tag: "Cloud",
    accent: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    image: "/images/projects/cloud-infrastructure.svg",
  },
  {
    title: "TradePro ERP",
    desc: "Comprehensive ERP system for an import/export company with inventory, billing, and compliance modules.",
    tag: "ERP",
    accent: "from-green-500/20 to-green-600/10",
    border: "border-green-500/20",
  },
  {
    title: "HealthFirst HMS",
    desc: "Hospital management system for a 5-clinic chain with appointments, billing, and EMR.",
    tag: "Healthcare",
    accent: "from-teal-500/20 to-teal-600/10",
    border: "border-teal-500/20",
  },
  {
    title: "EduLearn LMS",
    desc: "Learning management system for corporate training with progress tracking and certification.",
    tag: "EdTech",
    accent: "from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/20",
  },
];

const ProjectCard: React.FC<{
  title: string;
  desc: string;
  tag: string;
  accent: string;
  border: string;
  image?: string;
  index: number;
}> = ({ title, desc, tag, accent, border, image, index }) => (
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
          alt={title}
          width={400}
          height={200}
          className="w-full h-40 object-cover rounded-lg"
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
      <ZoomSectionTitle
        label="Portfolio"
        title="Our Projects"
        subtitle="A selection of the impactful solutions we've built for our clients."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(({ title, desc, tag, accent, border, image }, i) => (
          <ProjectCard
            key={title}
            title={title}
            desc={desc}
            tag={tag}
            accent={accent}
            border={border}
            image={image}
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
