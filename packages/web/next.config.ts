import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        domains: [
            'medusa-public-images.s3.eu-west-1.amazonaws.com',
            'localhost' // ← Add this
        ],
        // Or use remotePatterns for better security:
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '9000', // Your Medusa port
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
