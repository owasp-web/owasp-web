/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // No remote patterns needed since we're using local images now
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig; 