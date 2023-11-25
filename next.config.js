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
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      { hostname: "s3-ap-southeast-1.amazonaws.com" },
    ],
  },
};

module.exports = nextConfig;
