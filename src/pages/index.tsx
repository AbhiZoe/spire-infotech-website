import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
        <HeroSection />
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
