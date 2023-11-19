"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"


import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function ExplorerApp() {

  const HoverText = "select-none rounded-md p-1 transition-colors"

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm transition-all duration-300">Explorer</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-2">
              <li className="row-span-1">
              </li>
              <Link href="/cryptocurrencies" className={HoverText}>
                <div className="text-sm">
                  <div>Cryptocurrencies</div>
                </div>
              </Link>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "",
            className
          )}
          {...props}
        >
          <div>{title}</div>
          <p>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
