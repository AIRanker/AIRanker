import { atom } from "jotai"
import { atomWithStorage, loadable } from "jotai/utils"
import type { SuggestionResult } from "~/server/schema"

export const suggestionAtom = atomWithStorage<SuggestionResult>("aiSuggestion", {
  name: "Example AI Suggestion",
  description: "An example AI suggestion to demonstrate the UI.",
  softwares: [
    {
      name: "ChatGPT",
      url: "https://chat.openai.com",
      description:
        "Advanced language model capable of generating human-like text, answering questions, and assisting with various tasks. Features include contextual understanding, code generation, and creative writing capabilities.",
      collectionReason:
        "The gold standard for conversational AI, offering unparalleled natural language understanding and generation capabilities that can boost productivity across various domains."
    },
    {
      name: "Midjourney",
      url: "https://www.midjourney.com",
      description:
        "AI image generation tool that creates stunning visuals from text descriptions. Offers various style options, high-resolution outputs, and commercial usage rights for subscribers.",
      collectionReason:
        "Revolutionizes digital art creation with its ability to generate photorealistic and artistic images from simple text prompts, making professional-quality design accessible to everyone."
    },
    {
      name: "Notion AI",
      url: "https://www.notion.so/product/ai",
      description: "AI writing assistant integrated into Notion workspace that helps draft, edit, summarize, and brainstorm content directly within your notes and documents.",
      collectionReason:
        "Seamlessly enhances productivity by integrating powerful AI capabilities into an already robust workspace tool, streamlining content creation and organization."
    },
    {
      name: "Jasper",
      url: "https://www.jasper.ai",
      description:
        "AI content platform designed for marketing teams to create blog posts, social media content, and marketing copy with customizable tone and brand voice settings.",
      collectionReason: "Specifically optimized for marketing content, Jasper helps teams scale content production while maintaining consistent brand voice across all channels."
    },
    {
      name: "Runway",
      url: "https://runwayml.com",
      description:
        "Creative suite powered by AI for video editing, generation, and visual effects with tools for motion tracking, background removal, and text-to-video generation.",
      collectionReason:
        "Brings Hollywood-level visual effects capabilities to creators of all levels, dramatically reducing the time and technical expertise needed for advanced video production."
    },
    {
      name: "Anthropic Claude",
      url: "https://www.anthropic.com/claude",
      description:
        "Conversational AI assistant focused on helpfulness, harmlessness, and honesty with exceptional context handling and reduced hallucinations compared to competitors.",
      collectionReason:
        "Offers a more thoughtful and nuanced approach to AI assistance with superior context handling, making it ideal for complex research and sensitive discussions."
    },
    {
      name: "Synthesia",
      url: "https://www.synthesia.io",
      description: "AI video generation platform that creates professional videos with virtual presenters speaking in multiple languages, requiring only text input.",
      collectionReason:
        "Dramatically reduces the cost and complexity of video production, enabling businesses to create professional training and marketing videos in minutes instead of days."
    },
    {
      name: "Perplexity AI",
      url: "https://www.perplexity.ai",
      description: "AI-powered search engine that provides direct answers with cited sources instead of just links, combining the benefits of search and conversational AI.",
      collectionReason: "Reimagines information discovery by providing comprehensive, sourced answers rather than requiring users to sift through multiple search results."
    },
    {
      name: "Descript",
      url: "https://www.descript.com",
      description:
        "All-in-one audio and video editing platform that allows editing media as easily as editing a document, with AI transcription, voice cloning, and filler word removal.",
      collectionReason: "Makes professional audio and video editing accessible to non-experts through its innovative text-based editing approach, saving hours of editing time."
    },
    {
      name: "Copy.ai",
      url: "https://www.copy.ai",
      description:
        "AI copywriting tool specialized in generating marketing copy, product descriptions, and social media content with templates for various use cases and industries.",
      collectionReason:
        "Helps businesses overcome writer's block and scale content creation with specialized templates and frameworks designed specifically for marketing contexts."
    }
  ]
})

export const aiLoadingAtom = atom<boolean>(false)
