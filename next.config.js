/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "m.media-amazon.com",
      },
      {
        hostname: "cdn.gramedia.com",
      },
      {
        hostname: "upload.wikimedia.org",
      },
      {
        hostname: "sahabatgemainsani.id",
      },
      {
        hostname: "ebooks.gramedia.com",
      },
    ],
  },
};

module.exports = nextConfig;
