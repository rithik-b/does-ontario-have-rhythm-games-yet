/* eslint-disable */
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const nextTs = await import("next-public-ts")
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
  webpack(config) {
    config.plugins.push(
      new nextTs.NextPublicTsPlugin({
        autoDetect: true,
      }),
    )
    return config
  },
}

export default config
