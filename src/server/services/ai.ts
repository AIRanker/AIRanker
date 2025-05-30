import { generateObject, generateText, Output, streamObject, streamText, type CoreMessage } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { currentTime } from "../tools/ai"
import { createAISDKTools } from "@agentic/ai-sdk"
import { createAIFunction } from "@agentic/core"
import { GoogleCustomSearchClient } from "@agentic/google-custom-search"
import { env } from "~/env"
class AIService {
  async generateText(prompt: string) {
    try {
      const { text } = await generateText({
        model: openai("o3-mini"),
        prompt: "What is love?"
      })
      return text
    } catch (error) {
      console.error("Error generating text:", error)
      throw new Error("Failed to generate text")
    }
  }
  async generateCollection(messages: Array<CoreMessage>) {
    const relevantMessages = messages[messages.length - 1]
    const firstContent = relevantMessages?.content?.[0]
    if (!firstContent || typeof firstContent === "string" || !("text" in firstContent)) {
      throw new Error("No valid message content found")
    }

    const googleClient = new GoogleCustomSearchClient({
      apiKey: env.GOOGLE_SEARCH_API_KEY,
      cseId: env.GOOGLE_SEARCH_CSI
    })
    try {
      const result = streamText({
        model: openai("gpt-4o"),
        tools: createAISDKTools(
          googleClient,
          createAIFunction({
            name: "getCurrentTime",
            description: "Use this tool to get the current time.",
            inputSchema: z.object({}),
            execute: currentTime
          })
        ),
        maxSteps: 10,
        prompt: `
You are an expert in search engine information retrieval, specializing in the field of AI (including AI agents, MCP tools, AI websites, etc.). Please follow the process below to address the user's query:

1. **Decompose**: Extract the key terms of the query, determine the current time, and clarify the user's intent and the subdomain it belongs to.
2. **Search**: Use GoogleCustomSearch to search for high-quality information, prioritizing authoritative and up-to-date resources.
3. **Retrieve**: Extract the most relevant content from the results, filtering out unrelated or low-quality information.
4. **Reply**: Synthesize the answer and respond concisely, providing references when necessary.

user query: ${typeof relevantMessages?.content?.[0] === "object" && "text" in relevantMessages.content[0] ? relevantMessages.content[0].text : "No query provided"}
        `,
        experimental_output: Output.object({
          schema: z.object({
            name: z
              .string()
              .describe("A captivating and trending title for the collection that grabs attention (e.g., '10 Game-Changing AI Tools That Are Revolutionizing Design in 2025')"),
            description: z
              .string()
              .describe("An engaging introduction that hooks readers and highlights the value proposition of this collection - explain why these tools matter and who they're for"),
            softwares: z
              .array(
                z.object({
                  name: z.string().describe("The name of the AI software"),
                  url: z.string().url().describe("The homepage URL of the AI software"),
                  description: z
                    .string()
                    .describe(
                      "A comprehensive description covering: key features, main use cases, target audience, pricing model, unique selling points, and any standout technical capabilities"
                    ),
                  collectionReason: z
                    .string()
                    .describe(
                      "A persuasive, experience-based reason why this tool deserves to be in the collection - include personal insights, specific advantages, and real-world benefits"
                    )
                })
              )
              .describe("A curated and ranked list of AI tools, arranged from most recommended to least recommended based on overall value proposition")
          })
        })
      })
      return result.toDataStreamResponse()
    } catch (error) {
      console.error("Error generating collection:", error)
      throw new Error("Failed to generate collection")
    }
  }
}
const aiService = new AIService()
export default aiService
