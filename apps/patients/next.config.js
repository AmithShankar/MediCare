/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/patients',
  assetPrefix: process.env.NODE_ENV === 'development' ? 'http://localhost:3001/patients' : undefined,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
    ],
  },
  transpilePackages: [
    'framer-motion',
    'next-themes',
    '@medicare-pro/ui',
    '@medicare-pro/utils',
    '@medicare-pro/store',
    '@medicare-pro/hooks'
  ],
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'http://localhost:3000' },
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
