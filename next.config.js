/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
  },
  // basePath: "/blanko-explorer",
  // assetPrefix: "/blanko-explorer",
  trailingSlash: true,
};

module.exports = nextConfig;
