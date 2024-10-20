/** @type {import('next').NextConfig} */
const imageHost = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT.substring(8);

const nextConfig = {
  images: {
    domains: ["eshopadmin.s500.vn", "eshopapi.s500.vn"], // Add your image domains here
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: imageHost,
        pathname: "/uploads/images/**",
      },
      {
        protocol: "https",
        hostname: "eshopadmin.s500.vn",
        port: "",
        pathname: "/uploads/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4002",
        pathname: "/uploads/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1201",
        pathname: "/uploads/images/**",
      },
      {
        protocol: "https",
        hostname: "graphql102.s500.vn",
        port: "",
        pathname: "/uploads/images/**",
      },
      {
        protocol: "https",
        hostname: "graphql.ebtech.vn",
        port: "",
        pathname: "/uploads/images/**",
      },
      {
        protocol: "https",
        hostname: "g.ellib.vn",
        port: "",
        pathname: "/uploads/images/**",
      },
      {
        protocol: "https",
        hostname: "api.ellib.vn",
        port: "",
        pathname: "/uploads/images/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [],
  },
};

module.exports = nextConfig;
