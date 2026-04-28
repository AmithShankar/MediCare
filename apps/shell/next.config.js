const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3003';
const PATIENTS_URL = process.env.NEXT_PUBLIC_PATIENTS_URL || 'http://localhost:3001';
const ANALYTICS_URL = process.env.NEXT_PUBLIC_ANALYTICS_URL || 'http://localhost:3002';

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
  async rewrites() {
    return [
      {
        source: '/patients/:path*',
        destination: `${PATIENTS_URL}/patients/:path*`,
      },
      {
        source: '/analytics/:path*',
        destination: `${ANALYTICS_URL}/analytics/:path*`,
      },
      {
        source: '/auth/:path*',
        destination: `${AUTH_URL}/auth/:path*`,
      },
      {
        source: '/login',
        destination: `${AUTH_URL}/auth/login`,
      },
    ]
  },
}

module.exports = nextConfig
