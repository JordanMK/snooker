const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/src": path.resolve(__dirname, "src"),
      "@/components": path.resolve(__dirname, "components"),
      // FIXME: remove this alias when css files are moved to their own page folder
      "@/styles": path.resolve(__dirname, "src", "styles")
    }
    return config
  }
};

module.exports = nextConfig
