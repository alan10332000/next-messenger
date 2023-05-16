/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [['next-superjson-plugin', {}]],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig
