/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
  },
  basePath: "/blanko",
  assetPrefix: "/blanko",
  trailingSlash: true,
};

module.exports = nextConfig;
