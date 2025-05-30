import { openai } from "@ai-sdk/openai"
import { auth } from "@clerk/nextjs/server"
import { streamText, tool } from "ai"
import { z } from "zod"
import aiService from "~/server/services/ai"

export async function POST(req: Request) {
  const { messages } = await req.json()
  return await aiService.generateCollection(messages)
}
