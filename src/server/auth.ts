// import { getAddressFromMessage, getChainIdFromMessage, verifySignature } from "@reown/appkit-siwe"
// import NextAuth, { type DefaultSession } from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import { db } from "~/server/db"
// import { userService, type UserWithPlatforms } from "./services/user"
// import { env } from "~/env"

// declare module "next-auth" {
//   /**
//    * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session extends DefaultSession {
//     address: string
//     chainId: number
//     provider?: "GitHub" | "GitLab"
//   }
// }

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   session: {
//     strategy: "jwt"
//   },
//   callbacks: {
//     session: (params) => {
//       const { session, token } = params
//       if (!token.sub) {
//         return session
//       }
//       const [, chainId, address] = token.sub.split(":")
//       if (chainId && address) {
//         session.address = address.toLowerCase()
//         session.chainId = Number.parseInt(chainId, 10)
//       }
//       return session
//     },
//     jwt: async (param) => {
//       const { token } = param
//       if (token.sub) {
//         const [, , address] = token.sub.split(":")
//         if (address) {
//           const u = await db.user.findUnique({
//             where: {
//               address
//             }
//           })
//           if (u) {
//             token.address = u.address
//             token.name = u.name
//           }
//         }
//       }
//       return token
//     }
//   },
//   providers: [
//     Credentials({
//       name: "Ethereum",
//       credentials: {
//         message: {
//           label: "Message",
//           type: "text",
//           placeholder: "0x0"
//         },
//         signature: {
//           label: "Signature",
//           type: "text",
//           placeholder: "0x0"
//         }
//       },
//       authorize: async (credentials) => {
//         try {
//           if (!credentials?.message) {
//             throw new Error("SiweMessage is undefined")
//           }

//           const { message, signature } = credentials
//           const address = getAddressFromMessage(message as string).toLowerCase()
//           const chainId = getChainIdFromMessage(message as string)

//           const isValid = await verifySignature({
//             address,
//             message: message as string,
//             signature: signature as string,
//             chainId,
//             projectId: env.NEXT_PUBLIC_REOWN_PROJECT_ID
//           })

//           if (isValid) {
//             const currentUser: UserWithPlatforms | null = await userService.getUserByAddress(address)
//             if (!currentUser) {
//               await userService.createUser(address, undefined)
//             }

//             return {
//               id: `${chainId}:${address}`
//             }
//           }

//           return null
//         } catch (e) {
//           console.error(e)
//           return null
//         }
//       }
//     })
//   ]
// })

// export async function getApiKey(apiKey: string | null) {
//   if (!apiKey) {
//     return null
//   }

//   const apiKeyDb = await db.apiKey.findUnique({ where: { key: apiKey } })

//   if (apiKeyDb?.userAddress) {
//     const user = await db.user.findUnique({
//       where: {
//         address: apiKeyDb.userAddress
//       }
//     })

//     if (user) {
//       return { user }
//     }
//   }

//   return null
// }
