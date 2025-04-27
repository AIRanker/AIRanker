"use client"

import type { OpenOptions } from "node_modules/@reown/appkit/dist/types/src/client/appkit-base-client"
import type { ReactNode } from "react"
import { useAuth } from "./auth-context"
import type { Views } from "node_modules/@reown/appkit/dist/types/src/client/appkit-base-client"

export default function SignedIn({
  children
}: {
  children:
    | ReactNode
    | ((props: {
        address: string
        openDialog: (options?: OpenOptions<Views>) => Promise<void>
      }) => ReactNode)
}) {
  const { isAuthenticated, openDialog, address } = useAuth()

  return isAuthenticated ? (typeof children === "function" ? children({ address, openDialog }) : children) : null
}
