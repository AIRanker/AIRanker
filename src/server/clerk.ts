import { createClerkClient, type User } from "@clerk/nextjs/server";

export const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

export const fetchUserMap = async (userIds: string[]) => {
    const clerkUsers = await clerkClient.users.getUserList({
        userId: userIds,
        limit: 1000
    })
    const userMap = new Map(clerkUsers.data.map((user: User) => [user.id, user]))
    return userMap
}
export const fetchUser = async (userId: string) => {
    const clerkUser = await clerkClient.users.getUser(userId)
    return clerkUser
}