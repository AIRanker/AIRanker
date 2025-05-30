import { generateObject, generateText, streamObject, streamText } from "ai"
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
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async generateCollection(messages: any) {
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
          }),
          createAIFunction({
            name: "responseCollection",
            description:
              "Create a friendly, conversational collection of AI tools that feels like recommendations from a knowledgeable friend rather than a formal review. Use everyday language and real-life examples to help people understand these tools.",
            inputSchema: z.object({
              name: z
                .string()
                .describe("A captivating and trending title for the collection that grabs attention (e.g., '10 Game-Changing AI Tools That Are Revolutionizing Design in 2025')"),
              description: z
                .string()
                .describe(
                  "An engaging introduction that hooks readers and highlights the value proposition of this collection - explain why these tools matter and who they're for"
                ),
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
            }),
            execute: async ({ name, description, softwares }) => {
              return "done"
            }
          })
        ),
        maxSteps: 15,
        prompt: `
You are an expert in search engine information retrieval, specializing in the field of AI (including AI agents, MCP tools, AI websites, etc.). Please follow the process below to address the user's query:

1. **Decompose**: Extract the key terms of the query, determine the current time, and clarify the user's intent and the subdomain it belongs to.
2. **Search**: Use Google to search for high-quality information, prioritizing authoritative and up-to-date resources.
3. **Retrieve**: Extract the most relevant content from the results, filtering out unrelated or low-quality information.
4. **Reply**: Synthesize the answer and respond concisely, providing references when necessary.

Before you reply to the user, you must first call responseCollection to return the data, and then summarize the information you have collected in one sentence.`,
        messages
      })
      return result.toDataStreamResponse()
    } catch (error) {
      console.error("Error generating collection:", error)
      throw new Error("Failed to generate collection")
    }
  }
}
export default new AIService()
