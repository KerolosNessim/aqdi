/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aqid.subcodeco.com",
      },
    ],
  },
};

export default nextConfig;
