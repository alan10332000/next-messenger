/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [['next-superjson-plugin', {}]],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
