/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All imagery is bundled locally in /public, so no remote patterns are
    // needed. next/image still optimises and lazy-loads everything.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
