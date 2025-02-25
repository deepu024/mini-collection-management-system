// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      "supports-color": false,
      "bufferutil": false,
      "utf-8-validate": false,
      // etc.
    };
    return config;
  },
};

module.exports = nextConfig;
