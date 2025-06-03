import { createAISDKTools } from "@agentic/ai-sdk"
import { createAIFunction } from "@agentic/core"
import { GoogleCustomSearchClient } from "@agentic/google-custom-search"
import { openai } from "@ai-sdk/openai"
import { createOpenAI } from "@ai-sdk/openai"
import { type CoreMessage, Output, generateObject, generateText, streamObject, streamText } from "ai"
import { z } from "zod"
import { env } from "~/env"
import { suggestionSchema } from "~/server/schema"
import { currentTime, generateLogoImage, generateLogoPrompt } from "../tools/ai"
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
        onStepFinish({ text, toolCalls, toolResults, finishReason, usage }) {
          console.log("Step finished:", { text, toolCalls, toolResults, finishReason, usage })
          // your own logic, e.g. for saving the chat history or recording usage
        },
        tools: createAISDKTools(
          googleClient,
          createAIFunction({
            name: "getCurrentTime",
            description: "Use this tool to get the current time.",
            inputSchema: z.object({}),
            execute: currentTime
          }),
          createAIFunction({
            name: "result",
            description: "Use this tool to return the result to the user.",
            inputSchema: suggestionSchema,
            execute: async ({ name, description, softwares }) => {
              return "Your result has been received by the user and there is no need to call it again."
            }
          }),
          createAIFunction({
            name: "generateLogoPrompt",
            description: "Use this tool to generate a logo prompt for the collection.",
            inputSchema: z.object({
              name: z.string().describe("The name of the collection"),
              description: z.string().describe("A brief description of the collection")
            }),
            execute: generateLogoPrompt
          }),
          createAIFunction({
            name: "generateLogoImage",
            description: "Use this tool to generate a logo image for the collection.",
            inputSchema: z.object({
              prompt: z.string().describe("The prompt for generating the logo image.")
            }),
            execute: generateLogoImage
          })
        ),
        toolChoice: "auto",
        maxSteps: 15,
        prompt: `
You are an expert in search engine information retrieval, specializing in the field of AI (including AI agents, MCP tools, AI websites, etc.).
Please alternate the three steps of "Decompose, Search, and Retrieve" to effectively solve the user's query during the thinking stage:
Thinking stage:
1. **Decompose**: Extract the key terms of the query, determine the current time, and clarify the user's intent and the subdomain it belongs to.
2. **Search**: Use 'googleCustomSearch' tool to search for high-quality information, prioritizing authoritative and up-to-date resources.
3. **Retrieve**: Extract the most relevant content from the results, filtering out unrelated or low-quality information.

Answer stage:
1. **Generate Logo**: Generate a logo image for the collection using the 'generateLogoPrompt' and 'generateLogoImage' tools, it must be called.
2. **Result**: Synthesize the answer and use the 'result' tool to return it to the user.
3. **Reply**: Reply to the user with no more than two sentences.

Examples:
Thinking stage:
1. Decompose: The user input "10 image AI generation tools", 
    key terms are "image AI generation tools" and "Best AI image generation tools" and others key terms, 
    and use 'getCurrentTime' tool to get the current time. user intent is to find tools for generating images using AI.
2. Search: 
    Use 'googleCustomSearch' tool to search for "image AI generation tools" and retrieve the top 10 results.
3. Search: 
    Use 'googleCustomSearch' tool to search for "Best AI image generation tools" and retrieve the top 10 results.
4. Maybe Search again:
    Use 'googleCustomSearch' tool to search for others key terms.
5. Retrieve:
    Extract the most relevant content from the search results, filtering out unrelated or low-quality information.
Answer stage:
1. Generate Logo:
    First generate a logo prompt for the collection using the 'generateLogoPrompt' tool,
    then, generate a logo image for the collection using the 'generateLogoImage' tool.
2. Result:
    Synthesize the answer and use the 'result' tool to return it to the user.
3. Reply:
    Reply to the user with no more than two sentences.


user query: ${typeof relevantMessages?.content?.[0] === "object" && "text" in relevantMessages.content[0] ? relevantMessages.content[0].text : "No query provided"}
        `
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
