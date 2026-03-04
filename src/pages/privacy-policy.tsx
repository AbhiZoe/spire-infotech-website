import React from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";

interface Section {
  title: string;
  content: string[];
}

const sections: Section[] = [
  {
    title: "1. Information We Collect",
    content: [
      "We collect information you provide directly to us, such as your name, email address, phone number, and message when you submit our contact form.",
      "We may also collect certain technical data automatically, including IP addresses, browser type and version, pages visited, and the date and time of your visit, through standard web server logs and analytics tools.",
      "We do not knowingly collect personal information from individuals under the age of 16.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "To respond to your inquiries and provide the services you request.",
      "To send you administrative information, such as updates to our terms or policies.",
      "To improve our website, products, and services through usage analytics.",
      "To comply with legal obligations and protect our legal rights.",
      "We do not sell, rent, or trade your personal information to third parties for marketing purposes.",
    ],
  },
  {
    title: "3. Cookies and Tracking Technologies",
    content: [
      "We use essential cookies to ensure the website functions correctly. These cookies do not track you across other websites.",
      "We may use analytics cookies (such as Google Analytics) to understand how visitors interact with our website. You can opt out of analytics tracking via your browser settings.",
      "You can configure your browser to refuse all cookies or to indicate when a cookie is being sent. Some features of our website may not function properly if cookies are disabled.",
    ],
  },
  {
    title: "4. Data Sharing and Disclosure",
    content: [
      "We may share your personal data with trusted third-party service providers who help us operate our website and conduct our business, subject to confidentiality agreements.",
      "We may disclose your information if required by law, regulation, or valid legal process, or to protect the rights, property, or safety of Spire Infotech, our clients, or others.",
      "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.",
    ],
  },
  {
    title: "5. Data Security",
    content: [
      "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      "Data transmitted through our contact form is encrypted using SSL/TLS technology.",
      "While we take reasonable precautions, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.",
    ],
  },
  {
    title: "6. Data Retention",
    content: [
      "We retain personal data collected through contact form submissions for up to 24 months, after which it is securely deleted unless required for legal compliance.",
      "You may request deletion of your personal data at any time by contacting us at info@spireitco.com.",
    ],
  },
  {
    title: "7. Your Rights",
    content: [
      "Depending on your jurisdiction, you may have the right to: access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, object to or restrict processing of your data, and withdraw consent at any time.",
      "To exercise any of these rights, please contact us at info@spireitco.com. We will respond within 30 days.",
    ],
  },
  {
    title: "8. Third-Party Links",
    content: [
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.",
      "We encourage you to review the privacy policies of any third-party sites you visit.",
    ],
  },
  {
    title: "9. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated effective date.",
      "We encourage you to review this policy periodically to stay informed about how we protect your information.",
    ],
  },
  {
    title: "10. Contact Us",
    content: [
      "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:",
      "Email: info@spireitco.com",
      "Phone: +91 98765 43210",
      "Address: Surat, Gujarat, India – 395 007",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy – Spire Infotech</title>
        <meta
          name="description"
          content="Spire Infotech's Privacy Policy – learn how we collect, use, and protect your personal information."
        />
      </Head>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-secondary-800"
          >
            <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white text-sm font-bold">
              SI
            </div>
            <span>Spire Infotech</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <main className="pt-16">
        {/* Header */}
        <div className="gradient-dark text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-400">
              Effective Date: January 1, 2024 &nbsp;|&nbsp; Last Updated:{" "}
              January 1, 2024
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              At Spire Infotech (&quot;we&quot;, &quot;our&quot;, or
              &quot;us&quot;), we are committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website or use our
              services.
            </p>

            {sections.map((section) => (
              <div key={section.title} className="mb-8">
                <h2 className="text-xl font-bold text-secondary-800 mb-4 pb-2 border-b border-gray-200">
                  {section.title}
                </h2>
                {section.content.map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-3">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
