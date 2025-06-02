import { env } from "~/env"
import NodeFormData from "form-data"
import { Storage } from "@google-cloud/storage"
const GoogleStorageBucket = env.GOOGLE_STORAGE_BUCKET ?? "repofi"
const storage = new Storage()

export const currentTime = async () => {
  const date = new Date()
  return date.toISOString()
}

const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
}
export const generateLogoImage = async ({ name, description }: { name: string; description: string }) => {
  try {
    const formData = new NodeFormData()
    formData.append(
      "prompt",
      `Generate an AI with a sense of technology and recommend it to you,beautify the pictures through the contents in the collection. collection name: ${name}. description: ${description}`
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
