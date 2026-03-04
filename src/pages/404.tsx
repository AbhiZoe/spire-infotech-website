import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 – Page Not Found | Spire Infotech</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Head>
      <div className="min-h-screen gradient-dark flex items-center justify-center px-4">
        <div className="text-center text-white max-w-lg">
          <div className="text-9xl font-extrabold text-primary-500 mb-4 animate-pulse-slow">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Oops! The page you&apos;re looking for seems to have wandered off.
            Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Go Back Home
            </Link>
            <Link href="/#contact" className="btn-ghost">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
