/** @type {import('next').NextConfig} */
const imageHost = (process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT).substring(8)


const nextConfig = {
    images: {
        minimumCacheTTL: 60,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: imageHost,
                pathname: '/uploads/images/**',
            },
        ],
        
    },
    experimental: {
    optimizePackageImports: [],
  },
};

module.exports = nextConfig;
