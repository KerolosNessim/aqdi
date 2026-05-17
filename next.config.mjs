/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["aqid.subcodeco.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aqid.subcodeco.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
