// next.config.js
module.exports = {
  images: {
    domains: ["aqid.subcodeco.com", "b3app.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aqid.subcodeco.com",
        pathname: "/**",
      },
    ],
  }, eslint: {
    ignoreDuringBuilds: true,
  },
};