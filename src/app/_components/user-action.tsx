"use client"

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { DotIcon, User } from "lucide-react"

const UserAction = () => {
  return (
    <div className="flex items-center gap-4">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link labelIcon={<User className={"size-4"} />} label="Profile" href="/profile" />
            <UserButton.Action label="manageAccount" />
            <UserButton.Action label="signOut" />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
    </div>
  )
}
export default UserAction
