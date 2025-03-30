/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  // Optional: Improve error messages during development
  webpack: (
    // @ts-expect-error - webpack config type is complex
    config
  ) => {
    config.infrastructureLogging = {
      level: "error",
    };
    return config;
  },
};

export default nextConfig;
