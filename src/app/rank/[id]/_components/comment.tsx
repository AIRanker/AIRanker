import { MessageSquare, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"

interface Comment {
  id: string
  author: {
    username: string
    avatar?: string
  }
  content: string
  likes: number
  replies: number
  createdAt: string
}

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <div className="flex gap-3 py-4 border-b border-gray-100">
      <Avatar className="h-10 w-10">
        <AvatarImage src={comment.author.avatar} />
        <AvatarFallback>{comment.author.username[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Link href={`/profile/${comment.author.username}`} className="font-bold hover:underline">
            @{comment.author.username}
          </Link>
        </div>
        <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="text-xs">{comment.createdAt}</span>
          <div className="flex items-center gap-1">
            <ThumbsUp size={14} className="cursor-pointer" />
            <span>{comment.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare size={14} className="cursor-pointer" />
            <span>{comment.replies}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const Comments = () => {
  const comments: Comment[] = [
    {
      id: "1",
      author: {
        username: "AliceDev",
        avatar: "https://avatars.githubusercontent.com/u/12345678"
      },
      content:
        "This ranking is incredibly useful! I've been searching for the best AI frameworks, and this list has been a tremendous help. I particularly appreciate your detailed analysis of each framework's strengths and limitations.",
      likes: 128,
      replies: 7,
      createdAt: "3 days ago"
    },
    {
      id: "2",
      author: {
        username: "TechGuru",
        avatar: "https://avatars.githubusercontent.com/u/23456789"
      },
      content:
        "I believe TensorFlow should be ranked higher, as its ecosystem is more mature than PyTorch's. However, overall this is an excellent summary. The performance benchmarks you included are particularly valuable for those of us working on production systems.",
      likes: 85,
      replies: 12,
      createdAt: "2 days ago"
    },
    {
      id: "3",
      author: {
        username: "AIResearcher",
        avatar: "https://avatars.githubusercontent.com/u/34567890"
      },
      content:
        "Thanks for sharing! I've been comparing different frameworks for my research project, and this ranking provides excellent reference points. Your assessment of JAX is particularly accurate - it's indeed revolutionary for research applications requiring automatic differentiation.",
      likes: 64,
      replies: 3,
      createdAt: "1 day ago"
    },
    {
      id: "4",
      author: {
        username: "CodeNinja",
        avatar: "https://avatars.githubusercontent.com/u/45678901"
      },
      content:
        "I'm just starting with AI development, and this list is a perfect starting point. Could you recommend some learning resources for beginners? I'm particularly interested in computer vision applications but find the PyTorch documentation somewhat overwhelming.",
      likes: 42,
      replies: 5,
      createdAt: "12 hours ago"
    },
    {
      id: "5",
      author: {
        username: "DataScientist",
        avatar: "https://avatars.githubusercontent.com/u/56789012"
      },
      content:
        "Glad to see Hugging Face's Transformers library on the list. It has indeed greatly simplified the use of NLP models. The way it abstracts away the complexity while still allowing for customization is brilliant. Looking forward to your next article!",
      likes: 37,
      replies: 2,
      createdAt: "6 hours ago"
    },
    {
      id: "6",
      author: {
        username: "MLEngineer",
        avatar: "https://avatars.githubusercontent.com/u/67890123"
      },
      content:
        "Great compilation! I work in production ML and your section on deployment considerations is spot-on. One thing I'd add is that ONNX Runtime deserves more attention for cross-framework compatibility. It's been a game-changer for our team when deploying models from different frameworks.",
      likes: 29,
      replies: 4,
      createdAt: "5 hours ago"
    },
    {
      id: "7",
      author: {
        username: "CloudArchitect",
        avatar: "https://avatars.githubusercontent.com/u/78901234"
      },
      content:
        "As someone focused on cloud infrastructure for AI, I appreciate your mentions of framework efficiency. The section on memory usage was particularly helpful. Have you considered adding benchmarks for distributed training scenarios? That would be incredibly valuable for those of us designing multi-node systems.",
      likes: 23,
      replies: 1,
      createdAt: "4 hours ago"
    },
    {
      id: "8",
      author: {
        username: "StartupFounder",
        avatar: "https://avatars.githubusercontent.com/u/89012345"
      },
      content:
        "This ranking helped us make a strategic decision for our startup's tech stack. We were torn between PyTorch and TensorFlow, but your comparison of the ecosystems and community support made the choice clearer. We're now building on PyTorch and couldn't be happier with the developer experience.",
      likes: 18,
      replies: 0,
      createdAt: "3 hours ago"
    },
    {
      id: "9",
      author: {
        username: "EthicalAI",
        avatar: "https://avatars.githubusercontent.com/u/90123456"
      },
      content:
        "I appreciate that you included sections on interpretability tools for each framework. As AI systems become more prevalent, the ability to explain model decisions is crucial. Perhaps in a future update, you could expand on the ethical considerations and bias mitigation capabilities of each framework?",
      likes: 15,
      replies: 3,
      createdAt: "2 hours ago"
    },
    {
      id: "10",
      author: {
        username: "MobileAIDev",
        avatar: "https://avatars.githubusercontent.com/u/10123456"
      },
      content:
        "The section on mobile deployment options was exactly what I needed! I've been struggling to optimize models for edge devices, and your comparisons between TensorFlow Lite and PyTorch Mobile gave me new insights. Have you personally found one to be more performant than the other on Android devices?",
      likes: 12,
      replies: 6,
      createdAt: "1 hour ago"
    }
  ]
  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6 text-primary">Comments</h2>
      <div className="space-y-1">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

export default Comments
