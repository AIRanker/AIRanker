import "server-only"

import { createHydrationHelpers } from "@trpc/react-query/rsc"
import { cookies, headers } from "next/headers"
import { cache } from "react"

import { auth } from '@clerk/nextjs/server'
import { type AppRouter, createCaller } from "~/server/api/root"
import { createTRPCContext } from "~/server/api/trpc"
import { createQueryClient } from "./query-client"

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const cookieStore = await cookies();
  const headersList = await headers();
  return createTRPCContext({
    headers: new Headers({
      cookie: cookieStore.toString(),
      "x-trpc-source": "rsc"
    }),
    auth: await auth()
  })
})

const getQueryClient = cache(createQueryClient)
const caller = createCaller(createContext)

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(caller, getQueryClient)
