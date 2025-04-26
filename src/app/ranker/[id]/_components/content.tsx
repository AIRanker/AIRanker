"use client"
import { Lock } from "lucide-react"
import Image from "next/image"
import RankerDetail from "./ranker-detail"

const RankerContent = () => {
  const rankerItems = [
    {
      title: "LangChain",
      description: "A framework for developing applications powered by language models.",
      author: "@AliceDev",
      createdAt: "3 days ago",
      usedInCount: 18,
      likes: 128,
      comments: 7,
      tags: ["Python", "LLM", "Toolkit"],
      githubUrl: "https://github.com"
    },
    {
      title: "LlamaIndex",
      description: "A data framework for building LLM applications with external data.",
      author: "@BobDev",
      createdAt: "5 days ago",
      usedInCount: 12,
      likes: 98,
      comments: 5,
      tags: ["Python", "LLM", "Data"],
      githubUrl: "https://github.com"
    },
    {
      title: "Hugging Face",
      description: "The AI community building the future with open source models and datasets.",
      author: "@CarolDev",
      createdAt: "1 week ago",
      usedInCount: 24,
      likes: 156,
      comments: 9,
      tags: ["ML", "NLP", "Community"],
      githubUrl: "https://github.com"
    },
    {
      title: "OpenAI",
      description: "Creating safe artificial general intelligence that benefits all of humanity.",
      author: "@DaveDev",
      createdAt: "2 weeks ago",
      usedInCount: 32,
      likes: 210,
      comments: 15,
      tags: ["AI", "Research", "GPT"],
      githubUrl: "https://github.com"
    }
  ]
  return (
    <div className={"flex flex-col gap-8"}>
      <div className={"w-full h-[350px] flex justify-center items-center relative"}>
        <Image src={"https://storage.googleapis.com/repofi/external/img.png"} alt={"banner"} fill={true} />
        <div className={"z-10 text-white font-bold text-xl flex flex-col items-center gap-4"}>
          <Lock size={64} />
          <div>Like to unlock benefits.</div>
        </div>
      </div>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
        {rankerItems.map((item, index) => (
          <RankerDetail
            key={`ranker-detail-${item.title}-${index}`}
            title={item.title}
            description={item.description}
            author={item.author}
            createdAt={item.createdAt}
            usedInCount={item.usedInCount}
            likes={item.likes}
            comments={item.comments}
            tags={item.tags}
            githubUrl={item.githubUrl}
          />
        ))}
      </div>
    </div>
  )
}

export default RankerContent
