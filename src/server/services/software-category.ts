import { db } from "../db"

class SoftwareCategoryService {
  async all() {
    return await db.softwareCategory.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  }
}
const softwareCategoryService = new SoftwareCategoryService()
export { softwareCategoryService }
export type SoftwareCategoryResult = Awaited<ReturnType<typeof softwareCategoryService.all>>
