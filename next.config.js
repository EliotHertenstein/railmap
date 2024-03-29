/** @type {import('next').NextConfig} */

const withPwa = require('next-pwa')({
  disable: process.env.NODE_ENV !== 'production',
  dest: 'public',
})

module.exports = withPwa({
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
