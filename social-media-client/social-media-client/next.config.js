/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,
  env: {
    server_url: process.env.SERVER_URL
  }
}

module.exports = nextConfig
