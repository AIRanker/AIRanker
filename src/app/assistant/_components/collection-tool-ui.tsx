import { makeAssistantToolUI } from "@assistant-ui/react"
import { Spinner } from "@radix-ui/themes"

export type CollectionArgs = {
  name: string
  description: string
  softwares: Array<{
    name: string
    url: string
    description: string
    collectionReason: string
  }>
}

export const CollectionToolUI = makeAssistantToolUI<CollectionArgs, string>({
  toolName: "replyFn",
  render: ({ args, status }) => {
    if (status.type === "running") {
      return (
        <div className="flex items-center gap-2">
          <Spinner />
          <span>Generating AI tools collection...</span>
        </div>
      )
    }

    if (status.type === "incomplete" && status.reason === "error") {
      return <div className="text-red-500">Failed to generate collection</div>
    }

    return (
      <div className="space-y-6 rounded-lg bg-gray-50 p-6">
        <div>
          <h2 className="text-2xl font-bold">{args.name}</h2>
          <p className="mt-2 text-gray-600">{args.description}</p>
        </div>

        <div className="space-y-4">
          {args.softwares.map((software, index) => (
            <div key={software.name} className="rounded-lg border bg-white p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{software.name}</h3>
                <a href={software.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Visit Website
                </a>
              </div>
              <p className="mt-2 text-gray-700">{software.description}</p>
              <p className="mt-2 text-gray-600 italic">Why we recommend it: {software.collectionReason}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
})
