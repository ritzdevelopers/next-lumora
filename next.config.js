/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'source.unsplash.com'],
  },
};

module.exports = nextConfig;
