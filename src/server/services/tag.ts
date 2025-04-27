import type { Prisma } from "@prisma/client";
import type { PageableData, SearchParams } from "../schema";
import { db } from "../db";

class TagService {
    /**
     * 分页获取标签列表
     * @param params 搜索参数，包括分页信息和可选的搜索关键词
     * @returns 分页后的标签数据
     */
    async pageTags(params: SearchParams) {
        // 构建 where 条件
        const whereOptions: Prisma.TagWhereInput = {};
        // 如果有搜索关键词，添加搜索条件
        if (params.search) {
            whereOptions.name = {
                contains: params.search,
                mode: "insensitive" // 不区分大小写
            };
        }

        // 计算总记录数
        const total = await db.tag.count({ where: whereOptions });

        // 计算总页数
        const pages = Math.ceil(total / params.pageable.size) || 1;

        // 确保当前页在有效范围内
        const actualPage = Math.max(0, Math.min(params.pageable.page, pages - 1));

        // 查询标签数据，包括每个标签被使用的次数
        const tags = await db.tag.findMany({
            where: whereOptions,
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        ranks: true,  // 统计与排名关联的次数
                        softwares: true  // 统计与软件关联的次数
                    }
                }
            },
            orderBy: {
                name: "asc"  // 按名称字母顺序排序
            },
            skip: actualPage * params.pageable.size,
            take: params.pageable.size
        });

        // 处理返回数据，将计数整合到每个标签对象中
        const list = tags.map((tag) => ({
            id: tag.id,
            name: tag.name,
            count: tag._count.ranks + tag._count.softwares  // 总使用次数 = 排名中使用 + 软件中使用
        }));

        return {
            list,
            total,
            pages
        } as PageableData<(typeof list)[number]>
    }
}
export default new TagService();