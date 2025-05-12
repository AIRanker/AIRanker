import { db } from "../db"

class SoftwareCategoryService {
    async all() {
        return await db.softwareCategory.findMany({
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    }
}

export const softwareCategoryService = new SoftwareCategoryService()