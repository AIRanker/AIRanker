"use client"

import { useAuth, useClerk } from "@clerk/nextjs"
import { SendIcon } from "lucide-react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { cn } from "~/lib/utils"

const AskHero = () => {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()
  const [prompt, setPrompt] = useState("")
  return (
    <div className="relative  flex w-full flex-col items-center justify-center">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-5xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Generate your collections in hours".split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeInOut"
              }}
              className="mr-6 inline-block text-primary"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 0.5
          }}
          transition={{
            duration: 0.3,
            delay: 0.8
          }}
          className="relative z-10 mx-auto max-w-2xl opacity-50 py-4 text-center text-lg font-normal text-foreground dark:text-neutral-400"
        >
          Generate your collection with AI, to share experiences, explore top recommendations, and find the perfect AI tool for your needs!
        </motion.p>
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 0.3,
            delay: 1
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="relative w-full max-w-3xl">
            <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className={"bg-background shadow-xl p-4 h-48"} placeholder="Type your prompt here." />
            <Button
              size="icon"
              className="absolute bottom-3 right-3 bg-primary text-primary-foreground rounded-full"
              aria-label="Send message"
              onClick={() => {
                if (!isSignedIn) {
                  openSignIn()
                  return
                }
                if (prompt.trim().length === 0) {
                  toast.warning("Please enter a prompt before submitting.")
                  return
                }
                router.push(`/assistant?prompt=${encodeURIComponent(prompt)}`)
              }}
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.3,
            delay: 1.2
          }}
          className="relative mt-10 z-10 mx-auto max-w-5xl gap-4 grid grid-cols-2 py-4 text-center text-lg font-normal text-foreground dark:text-neutral-400"
        >
          {[
            {
              title: "Best AI Drawing Tools",
              prompt: "Generate a ranking of the best AI drawing tools, including Midjourney, DALL-E, and Stable Diffusion"
            },
            {
              title: "AI Writing Assistants Comparison",
              prompt: "Create a comparison list of AI writing assistants, analyzing the pros and cons of ChatGPT, Claude, and Bard"
            },
            {
              title: "Free AI Tools Collection",
              prompt: "Compile a collection of the best free AI tools, including image generation, text processing, and audio conversion tools"
            },
            {
              title: "AI Video Editing Software Ranking",
              prompt: "Compare the best AI video editing software on the market, ranked by ease of use and feature richness"
            }
          ].map((item) => (
            <div
              key={`prompt-${item.title}`}
              className="bg-background/80 backdrop-blur-sm p-4 text-left rounded-lg shadow-sm border border-border hover:border-primary/50 cursor-pointer transition-all"
              onClick={() => setPrompt(item.prompt)}
            >
              <h3 className="text-sm font-medium mb-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.prompt}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default AskHero
