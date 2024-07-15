/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    RSS_FEED_URL: process.env.RSS_FEED_URL,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.example$/,
      use: "raw-loader",
    });

    return config;
  },
};

module.exports = nextConfig;
