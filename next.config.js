/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI:
      process.env.NODE_ENV === 'development'
        ? 'mongodb://localhost/thecultstyle'
        : process.env.MONGODB_URI,
  },
};

module.exports = nextConfig;
