import React from "react";
import Head from "next/head";
import Image from "next/image";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/* ── Inline section components to avoid file bloat ── */

const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <a href="#" className="flex items-center">
        <Image
          src="/images/logo.svg"
          alt="Spire Infotech"
          width={180}
          height={40}
          priority
        />
      </a>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
        {["About", "Services", "Projects", "Testimonials", "Contact"].map(
          (item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-primary-500 transition-colors"
            >
              {item}
            </a>
          )
        )}
        <a href="#contact" className="btn-primary text-sm px-4 py-2">
          Get in Touch
        </a>
      </div>
    </div>
  </nav>
);

const Hero: React.FC = () => (
  <section
    id="hero"
    className="min-h-screen flex items-center gradient-dark text-white pt-16"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <span className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-4 animate-fade-in">
        Innovative Software Solutions
      </span>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up leading-tight">
        Empowering Businesses
        <br />
        <span className="text-gradient">with Smart Technology</span>
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 animate-fade-in">
        We build custom ERP systems, web applications, and mobile solutions
        that transform how you work and accelerate your growth.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
        <a href="#contact" className="btn-primary">
          Start Your Project
        </a>
        <a href="#projects" className="btn-ghost">
          View Our Work
        </a>
      </div>
    </div>
  </section>
);

const About: React.FC = () => (
  <section id="about" className="section-padding bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="animate-slide-in-left">
          <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
            About Us
          </span>
          <h2 className="section-title mb-4">
            Your Technology Partner for Growth
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Spire Infotech is a leading software solutions company based in
            Surat, Gujarat, India. We specialize in developing custom
            enterprise software, ERP systems, and digital transformation
            solutions for businesses of all sizes.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            With over a decade of experience, our team of skilled developers
            and consultants delivers innovative, scalable, and reliable
            technology solutions tailored to your unique business needs.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: "10+", label: "Years of Experience" },
              { value: "200+", label: "Projects Delivered" },
              { value: "50+", label: "Happy Clients" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-1">
                  {value}
                </div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="animate-slide-in-right">
          <Image
            src="/images/about/team.svg"
            alt="Spire Infotech team at work"
            width={560}
            height={400}
            className="rounded-2xl w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
);

const serviceItems = [
  {
    title: "ERP Solutions",
    desc: "End-to-end enterprise resource planning systems tailored to your industry.",
    icon: "🏢",
    image: "/images/services/erp.svg",
  },
  {
    title: "Custom Software",
    desc: "Bespoke software applications built to solve your specific business challenges.",
    icon: "⚙️",
    image: "/images/services/enterprise.svg",
  },
  {
    title: "Web Development",
    desc: "Modern, responsive websites and web applications that engage your audience.",
    icon: "🌐",
    image: "/images/services/web-dev.svg",
  },
  {
    title: "Mobile Apps",
    desc: "iOS and Android mobile apps that extend your business reach.",
    icon: "📱",
    image: "/images/services/mobile-app.svg",
  },
  {
    title: "Cloud Services",
    desc: "Scalable cloud infrastructure and migration services for modern businesses.",
    icon: "☁️",
    image: "/images/services/cloud.svg",
  },
  {
    title: "Data Analytics",
    desc: "Turn your data into actionable insights with powerful analytics dashboards.",
    icon: "📊",
    image: "/images/services/analytics.svg",
  },
];

const Services: React.FC = () => (
  <section id="services" className="section-padding bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 animate-fade-in">
        <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
          What We Do
        </span>
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle mx-auto text-gray-600">
          Comprehensive technology solutions to accelerate your digital
          transformation journey.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceItems.map(({ title, desc, image }) => (
          <div key={title} className="card p-6">
            <div className="mb-4">
              <Image
                src={image}
                alt={title}
                width={64}
                height={64}
              />
            </div>
            <h3 className="font-bold text-secondary-800 text-lg mb-2">
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

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
      <div className="text-center mb-12">
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {whyItems.map(({ title, desc }) => (
          <div
            key={title}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-500/50 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center mb-4">
              <div className="w-3 h-3 rounded-full bg-primary-400" />
            </div>
            <h3 className="font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const technologiesWithLogos = [
  { name: "React", image: "/images/tech/react.svg" },
  { name: "Next.js", image: "/images/tech/nextjs.svg" },
  { name: "Node.js", image: "/images/tech/nodejs.svg" },
  { name: "Python", image: "/images/tech/python.svg" },
  { name: "AWS", image: "/images/tech/aws.svg" },
  { name: "Docker", image: "/images/tech/docker.svg" },
  { name: "MongoDB", image: "/images/tech/mongodb.svg" },
];

const technologiesTextOnly = ["Java", ".NET", "Flutter", "React Native", "PostgreSQL"];

const Technologies: React.FC = () => (
  <section id="technologies" className="section-padding bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 animate-fade-in">
        <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
          Tech Stack
        </span>
        <h2 className="section-title">Technologies We Use</h2>
        <p className="section-subtitle mx-auto text-gray-600">
          We leverage the latest and most reliable technologies to build robust
          solutions.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {technologiesWithLogos.map(({ name, image }) => (
          <div
            key={name}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-primary-200 text-secondary-700 font-medium text-sm hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
          >
            <Image
              src={image}
              alt={name}
              width={22}
              height={22}
              className="flex-shrink-0"
            />
            {name}
          </div>
        ))}
        {technologiesTextOnly.map((name) => (
          <div
            key={name}
            className="px-5 py-2.5 rounded-full border-2 border-primary-200 text-secondary-700 font-medium text-sm hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const projects = [
  {
    title: "TradePro ERP",
    desc: "Comprehensive ERP system for an import/export company with inventory, billing, and compliance modules.",
    tag: "ERP",
    image: "/images/projects/cloud-infra.svg",
  },
  {
    title: "HealthFirst HMS",
    desc: "Hospital management system for a 5-clinic chain with appointments, billing, and EMR.",
    tag: "Healthcare",
    image: "/images/projects/erp-dashboard.svg",
  },
  {
    title: "RetailMax Platform",
    desc: "Multi-vendor e-commerce platform with real-time inventory and analytics dashboard.",
    tag: "E-Commerce",
    image: "/images/projects/ecommerce.svg",
  },
  {
    title: "LogiTrack App",
    desc: "Mobile logistics tracking app for fleet management and real-time shipment monitoring.",
    tag: "Mobile",
    image: "/images/projects/banking.svg",
  },
  {
    title: "FinSmart Dashboard",
    desc: "Financial analytics platform with automated reporting and compliance tracking.",
    tag: "FinTech",
    image: "/images/projects/banking.svg",
  },
  {
    title: "EduLearn LMS",
    desc: "Learning management system for corporate training with progress tracking and certification.",
    tag: "EdTech",
    image: "/images/projects/cloud-infra.svg",
  },
];

const Projects: React.FC = () => (
  <section id="projects" className="section-padding bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 animate-fade-in">
        <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
          Portfolio
        </span>
        <h2 className="section-title">Our Projects</h2>
        <p className="section-subtitle mx-auto text-gray-600">
          A selection of the impactful solutions we&apos;ve built for our
          clients.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(({ title, desc, tag, image }) => (
          <div key={title} className="card overflow-hidden">
            <div className="w-full h-40 overflow-hidden bg-gray-50">
              <Image
                src={image}
                alt={title}
                width={400}
                height={240}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="inline-block text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3">
                {tag}
              </span>
              <h3 className="font-bold text-secondary-800 text-lg mb-2">
                {title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          </div>
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
