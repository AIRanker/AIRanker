import { env } from "~/env"
import NodeFormData from "form-data"
import { Storage } from "@google-cloud/storage"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
const GoogleStorageBucket = env.GOOGLE_STORAGE_BUCKET ?? "repofi"
const storage = new Storage()

export const currentTime = async () => {
  const date = new Date()
  return date.toISOString()
}

const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
}

export const generateLogoPrompt = async ({ name, description }: { name: string; description: string }) => {
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `
    You are an AI that generates studio diffusion prompts for creating logos.
    Please generate a prompt based on the name and description of the set, which should not exceed 200 words.
    Your response should be a single line of text without any additional formatting or explanations.

    Name: ${name}
    Description: ${description}
    `
  })

  return text
}

export const generateLogoImage = async ({ prompt }: { prompt: string }) => {
  try {
    const formData = new NodeFormData()
    formData.append(
      "prompt",
      prompt,
    )
    formData.append("output_format", "webp")
    formData.append("aspect_ratio", "16:9")

    // Get the auto-generated boundary from FormData
    const formDataHeaders = formData.getHeaders()

    const response = await fetch("https://api.stability.ai/v2beta/stable-image/generate/ultra", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.STABILITY_API_KEY}`,
        Accept: "image/*",
        ...formDataHeaders // This includes Content-Type with proper boundary
      },
      body: formData.getBuffer()
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Stability AI API error: ${response.status} - ${errorText}`)
    }
    const imageBuffer = Buffer.from(await response.arrayBuffer())
    const fileName = `airanker/avatar/${generateUniqueId()}.webp`

    // Upload file directly
    await storage
      .bucket(GoogleStorageBucket)
      .file(fileName)
      .save(imageBuffer, {
        metadata: {
          contentType: "image/webp"
        }
      })

    return `https://storage.googleapis.com/${GoogleStorageBucket}/${fileName}`
  } catch (error) {
    console.error("Error generating logo:", error)
    throw error
  }
}
