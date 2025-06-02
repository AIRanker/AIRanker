/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  output: "standalone",
  images: {
    domains: ["storage.googleapis.com", "avatars.githubusercontent.com", "picsum.photos", "api.microlink.io", "aceternity.com"]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

export default config
