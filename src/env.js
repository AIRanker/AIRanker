import { createEnv } from "@t3-oss/env-nextjs"
import { isAddress } from "viem"
import { z } from "zod"

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    REDIS_HOST: z.string(),
    REDIS_PORT: z.string().regex(/^\d+$/),
    REDIS_DB: z.string().regex(/^\d+$/),
    REDIS_PASSWORD: z.string(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    GOOGLE_STORAGE_BUCKET: z.string().optional(),
    GOOGLE_APPLICATION_CREDENTIALS: z.string(),
    CHAIN_RPC_URL: z
      .preprocess(
        (val) => {
          if (typeof val !== "string") {
            return {}
          }
          // val is in the format of "<chainId>:<rpcUrl>;<chainId>:<rpcUrl>;"
          const chainRpcMap = val.split(";").reduce((acc, curr) => {
            const [chainId, rpcUrl] = curr.split("|")
            if (chainId && rpcUrl) {
              return Object.assign(acc, { [chainId]: rpcUrl })
            }
            return acc
          }, {})
          return chainRpcMap
        },
        z.record(z.string(), z.string().url())
      )
      .optional()
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_REOWN_PROJECT_ID: z.string(),
    NEXT_PUBLIC_CHAIN_ID: z.preprocess((val) => Number(val), z.number()),
    NEXT_PUBLIC_GIT_SHA: z.string().optional(),
    NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS: z.string().refine((v) => isAddress(v), "Invalid manager address"),
    NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS: z.string().refine((v) => isAddress(v), "Invalid token address")
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_DB: process.env.REDIS_DB,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
    CHAIN_RPC_URL: process.env.CHAIN_RPC_URL,
    NEXT_PUBLIC_REOWN_PROJECT_ID: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID,
    NEXT_PUBLIC_GIT_SHA: process.env.NEXT_PUBLIC_GIT_SHA,
    NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS,
    NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS,
    GOOGLE_STORAGE_BUCKET: process.env.GOOGLE_STORAGE_BUCKET
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true
})
