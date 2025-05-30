import z from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"
import aiService from "~/server/services/ai"
export async function POST(req: Request) {
  const { messages } = await req.json()
    return await aiService.generateCollection(messages)
}
