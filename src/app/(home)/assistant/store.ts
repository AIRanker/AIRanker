import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import type { SuggestionResult } from "~/server/schema"

export const suggestionAtom = atomWithStorage<SuggestionResult>("aiSuggestion", {
  name: "Example AI Suggestion",
  description: "An example AI suggestion to demonstrate the UI.",
  softwares: []
})

export const aiLoadingAtom = atom<boolean>(false)
