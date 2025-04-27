"use client"

import { Plus, X } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

type TagListProps = {
  tags?: string[]
  onTagsChange?: (tags: string[]) => void
  maxTags?: number
  readOnly?: boolean
  className?: string
  placeholder?: string
}

const TagList = ({ tags: initialTags = [], onTagsChange, maxTags = 10, readOnly = false, className = "", placeholder = "Add a tag..." }: TagListProps) => {
  const [tags, setTags] = useState<string[]>(initialTags)
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    setTags(initialTags)
  }, [initialTags])

  const handleAddTag = () => {
    if (inputValue.trim() && tags.length < maxTags) {
      const newTags = [...tags, inputValue.trim()]
      setTags(newTags)
      onTagsChange?.(newTags)
      setInputValue("")
    }
  }

  const handleRemoveTag = (index: number) => {
    console.log("test index")
    const newTags = tags.filter((_, i) => i !== index)
    setTags(newTags)
    onTagsChange?.(newTags)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={`tag-${tag}-${index}`} variant="outline" className="px-3 py-1 flex flex-row gap-1 text-primary">
            <div>{tag}</div>
            {!readOnly && (
              <div className={"cursor-pointer"}>
                <X className="ml-1 h-3 z-10 w-3" onClick={() => handleRemoveTag(index)} />
              </div>
            )}
          </Badge>
        ))}
      </div>

      {!readOnly && tags.length < maxTags && (
        <div className="flex items-center gap-2">
          <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder} className="h-9" />
          <Button variant="outline" size="sm" className="whitespace-nowrap" onClick={handleAddTag} disabled={!inputValue.trim()}>
            <Plus className="h-4 w-4 mr-1" />
            Add Tag
          </Button>
        </div>
      )}
    </div>
  )
}

export default TagList
