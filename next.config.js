/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgs.creasmall.com",
      },
    ],
  },
};

module.exports = nextConfig
