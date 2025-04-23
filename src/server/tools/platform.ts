import type { Platform } from "@prisma/client";

export async function fetchUserInfo(accessToken: string, platform: Platform): Promise<{ avatar: string; name: string; id: string; }> {
    // Replace with actual implementation that returns an object with avatar, name, and id
    return {
        avatar: "defaultAvatarUrl",
        name: "defaultName",
        id: "defaultId"
    }
}