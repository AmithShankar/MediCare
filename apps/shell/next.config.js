const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3003';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  transpilePackages: [
    'recharts',
    'framer-motion',
    'next-themes',
    '@medicare-pro/ui',
    '@medicare-pro/utils',
    '@medicare-pro/store',
    '@medicare-pro/hooks'
  ],
  async redirects() {
    return [
      { source: '/favicon.png', destination: '/favicon.svg', permanent: false },
      { source: '/favicon.ico', destination: '/favicon.svg', permanent: false },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: `${AUTH_URL}/auth/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
