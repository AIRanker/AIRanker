"use client"

import { SignInButton, SignedIn, SignedOut, UserButton, useAuth, useClerk } from "@clerk/nextjs"
import { DotIcon, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"

const UserAction = () => {
  const { openSignIn } = useClerk()
  const { isSignedIn } = useAuth()

  const router = useRouter()
  return (
    <div className="flex items-center gap-4">
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link labelIcon={<User className={"size-4"} />} label="Profile" href="/profile" />
            <UserButton.Action label="manageAccount" />
            <UserButton.Action label="signOut" />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
      <Button
        variant={"outline"}
        className={"border-primary text-primary font-bold"}
        onClick={() => {
          if (isSignedIn) {
            router.push("/create/tool")
          } else {
            openSignIn()
          }
        }}
      >
        Create Tool
      </Button>
      <Button
        variant={"outline"}
        className={"border-primary text-primary font-bold"}
        onClick={() => {
          if (isSignedIn) {
            router.push("/create")
          } else {
            openSignIn()
          }
        }}
      >
        Create Collection
      </Button>
    </div>
  )
}
export default UserAction
