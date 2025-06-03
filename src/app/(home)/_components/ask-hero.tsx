"use client"

import { useAuth, useClerk } from "@clerk/nextjs"
import { SendIcon } from "lucide-react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import ideas from "~/components/json/idea.json"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { cn } from "~/lib/utils"
interface Idea {
  keyword: string
  questions: string
}

const AskHero = () => {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()
  const [prompt, setPrompt] = useState("")
  const [selectedIdea, setSelectedIdea] = useState<Idea[]>([])

  useEffect(() => {
    refreshIdeas()
  }, [])

  const refreshIdeas = () => {
    const shuffled = [...ideas].sort(() => Math.random() - 0.5)
    setSelectedIdea(
      shuffled.slice(0, 4).map((idea) => {
        return { keyword: idea.keyword, questions: idea.questions[0] || "" }
      })
    )
  }
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
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={
                "bg-background p-6 h-48 resize-none placeholder:text-gray-400 placeholder:italic placeholder:opacity-60 shadow-[0px_4px_40px_0px_#C1C1C140] border border-gray-300"
              }
              placeholder="✨ Enter the AI tools collection you want to create, or choose from the ideas below! 🎯"
            />
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
          className="relative z-10 mt-10 mx-auto max-w-5xl py-4 text-left text-xl font-normal text-foreground dark:text-neutral-400"
        >
          <div className="flex items-center gap-2">
            <span>💡 Idea</span>
            <Button variant="ghost" size="sm" onClick={refreshIdeas} className="p-1 px-3 h-auto bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 hover:dark:bg-gray-700">
              Refresh
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
          className="relative z-10 mx-auto max-w-5xl gap-6 grid grid-cols-2 py-4 text-center text-lg font-normal text-foreground dark:text-neutral-400"
        >
          {selectedIdea.map((question: Idea, index) => {
            return (
              <div
                key={`prompt-${question.keyword}-${index}`}
                className="bg-background/80 backdrop-blur-sm p-4 text-left rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-all"
                onClick={() => setPrompt(question.questions || "")}
              >
                <h3 className="text-base font-medium mb-3">{question.keyword}</h3>
                <p className="text-sm text-muted-foreground">{question.questions}</p>
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default AskHero
