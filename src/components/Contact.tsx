import React from "react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  details: string[];
  link?: string;
  linkLabel?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  details,
  link,
  linkLabel,
}) => (
  <motion.div
    className="card p-6 flex flex-col items-center text-center group"
    variants={fadeInUp}
    whileHover={{
      y: -6,
      boxShadow: "0 16px 40px rgba(31,199,199,0.16)",
      transition: { duration: 0.3 },
    }}
  >
    <motion.div
      className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors duration-300"
      whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
    >
      {icon}
    </motion.div>
    <h3 className="font-semibold text-secondary-800 mb-2 group-hover:text-primary-600 transition-colors duration-300">
      {title}
    </h3>
    {details.map((d, i) => (
      <p key={i} className="text-gray-600 text-sm">
        {d}
      </p>
    ))}
    {link && linkLabel && (
      <motion.a
        href={link}
        className="mt-3 text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors inline-flex items-center gap-1"
        whileHover={{ x: 3 }}
      >
        {linkLabel}
      </motion.a>
    )}
  </motion.div>
);

const Contact: React.FC = () => {
  const cards: ContactCardProps[] = [
    {
      icon: (
        <svg
          className="w-6 h-6 text-primary-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email Us",
      details: ["info@spireitco.com", "support@spireitco.com"],
      link: "mailto:info@spireitco.com",
      linkLabel: "Send an email →",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-primary-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Call Us",
      details: ["+91 98765 43210", "Mon – Sat, 9 AM – 6 PM IST"],
      link: "tel:+919876543210",
      linkLabel: "Call now →",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-primary-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Visit Us",
      details: ["Surat, Gujarat, India", "395 007"],
      link: "https://maps.google.com/?q=Surat,Gujarat,India",
      linkLabel: "Get directions →",
    },
  ];

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
            Get in Touch
          </span>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle mx-auto text-gray-600">
            Have a project in mind or a question? We&apos;d love to hear from
            you. Reach out and we&apos;ll respond promptly.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {cards.map((card, i) => (
            <ContactCard key={i} {...card} />
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="max-w-2xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
