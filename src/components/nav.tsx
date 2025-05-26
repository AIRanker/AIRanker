"use client"

import { useAuth, useClerk, useSignIn } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "~/lib/utils"
import { MobileMenu } from "./mobile-menu"
export const navItems = [
  {
    name: "Profile",
    href: "/profile",
    requiresLogin: true
  }
]
export default function Nav() {
  const pathname = usePathname()
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()

  return (
    <>
      <nav className="hidden items-center justify-center gap-4 text-sm md:flex">
        {navItems.map((item) => {
          if (item.requiresLogin && !isSignedIn) {
            return (
              <div
                key={item.name}
                className={cn(
                  "px-4 py-2 text-muted-foreground hover:text-foreground cursor-pointer",
                  item.href === "/" ? pathname === "/" && "font-bold text-primary " : pathname.startsWith(item.href) && "font-medium text-primary"
                )}
                onClick={() => openSignIn()}
              >
                {item.name}
              </div>
            )
          }
          return (
            <Link
              key={item.name}
              className={cn(
                "px-4 py-2 text-muted-foreground hover:text-foreground",
                item.href === "/" ? pathname === "/" && "font-bold text-primary " : pathname.startsWith(item.href) && "font-medium text-primary"
              )}
              href={item.href}
            >
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="block md:hidden">
        <MobileMenu navs={navItems} />
      </div>
    </>
  )
}
