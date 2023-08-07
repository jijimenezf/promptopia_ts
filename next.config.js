/** @type {import('next').NextConfig} */
const isProd = process.env.MY_ENV === 'production';
const isStaging = process.env.MY_ENV === 'staging';
const isDevelopment = process.env.MY_ENV === 'development';

const nextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: '**',
            port: '',
            pathname: '**',
        },
    ],
  },
}

/**
 * module.exports = {
    reactStrictMode: true,
    images: {
        domains: ["yourDomain.com"],
        formats: ["image/webp"],
    },
};
 */

module.exports = nextConfig
