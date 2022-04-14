/** @type {import('next').NextConfig} */
const nextConfig = {
  target: 'serverless',
  poweredByHeader: false,
  generateEtags: false,
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
