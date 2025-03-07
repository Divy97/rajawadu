/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  // Optional: Improve error messages during development
  webpack: (config) => {
    config.infrastructureLogging = {
      level: "error",
    };
    return config;
  },
};

module.exports = nextConfig;
