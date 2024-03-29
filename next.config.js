/** @type {import('next').NextConfig} */

const withPwa = require('next-pwa')({
  disable: process.env.NODE_ENV !== 'production',
  dest: 'public',
})

module.exports = withPwa({
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/next',
        destination: '/',
        permanent: true,
      },
    ]
  },
})
