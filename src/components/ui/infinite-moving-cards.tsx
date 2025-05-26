"use client"

import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import SoftwareAction from "~/app/_components/software-action"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { LinkPreview } from "~/components/ui/link-preview"
import { cn } from "~/lib/utils"

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className
}: {
  items: {
    name: string
    url: string
    image: string
    description: string
    createdAt: Date
  }[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  useEffect(() => {
    addAnimation()
  }, [])
  const [start, setStart] = useState(false)
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      // biome-ignore lint/complexity/noForEach: <explanation>
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards")
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse")
      }
    }
  }
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s")
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s")
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s")
      }
    }
  }
  return (
    <div ref={containerRef} className={cn("scroller relative z-20 max-w-7xl [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]", className)}>
      <ul
        ref={scrollerRef}
        className={cn("flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4", start && "animate-scroll", pauseOnHover && "hover:[animation-play-state:paused]")}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)] px-8 py-6 md:w-[450px] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]"
            key={item.name}
          >
            <blockquote>
              <div aria-hidden="true" className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]" />
              <div className={"flex flex-row gap-4 items-center relative z-20 "}>
                <Avatar className={"w-8 h-8 relative z-20 "}>
                  <AvatarImage src={item.image} />
                  <AvatarFallback>{item.name}</AvatarFallback>
                </Avatar>
                <Link href={item.url} target={"_blank"} className="font-bold text-2xl z-40">
                  {item.name}
                </Link>
              </div>
              <div className={"mt-4"}>{item.description}</div>
              <div className={"flex flex-row gap-2"}>
                <div className={"mt-2 text-gray-400 text-sm"}>Created {formatDistanceToNow(item.createdAt)}</div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  )
}
