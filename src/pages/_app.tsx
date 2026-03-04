import type { AppProps } from "next/app";
import { useEffect } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return <Component {...pageProps} />;
}
