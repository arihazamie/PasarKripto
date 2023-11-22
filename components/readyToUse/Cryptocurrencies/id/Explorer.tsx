"use client"

import * as React from "react"
import Link from "next/link"
import { MdOutlineOpenInNew } from "react-icons/md";

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const Page = () => {

  const HoverText = "hover:bg-MyPurple p-1 rounded transition-all duration-300"

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm transition-all duration-300 bg-MyPurple my-2">Explorer</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 px-4">
              <li className="row-span-1">
              </li>
              <Link href="/cryptocurrencies" className={HoverText}>
                <div className="text-sm flex items-center gap-1">
                  <div>Cryptocurrencies </div>
                  <div><MdOutlineOpenInNew /></div>
                </div>
              </Link>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Page

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
