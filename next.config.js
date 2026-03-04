/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
