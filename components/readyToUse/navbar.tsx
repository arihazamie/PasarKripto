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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { title } from "process"

const components: { title: string; link: string; description: string }[] = [
    {
      title: "Alert Dialog",
      link: "/",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      link: "/",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Exchange",
      link: "/",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Dominance",
      link: "/dominance",
      description: "Strength compared to other cryptocurrencies.",
    },
    {
      title: "Spot",
      link: "/spot",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Legal Tender Countries",
      link: "/legal-tender",
      description:
        "Countries and territories that have passed laws that allow cryptocurrencies to be used as legal tender.",
    },
  ]



  export default function NavigationBar() {

    const HoverText = "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"

    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xl">Get Started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        PasarKripto
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                      A platform that provides precise and easy-to-understand crypto market information.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <Link href="/ranking" className={HoverText}>
                  <div className="text-sm">
                    <div>Ranking</div>
                    <div className="text-gray-400">Best Cryptocurrencies by MarketCap</div>
                  </div>
                </Link>
                <Link href="/trending" className={HoverText}>
                  <div className="text-sm">
                    <div>Trending</div>
                    <div className="text-gray-400">Most Trending Cryptocurrencies</div>
                  </div>
                </Link>
                <Link href="/most" className={HoverText}>
                  <div className="text-sm">
                    <div>Gainers & Losers</div>
                    <div className="text-gray-400">Rising and Falling Cryptocurrencies</div>
                  </div>
                </Link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xl">Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <div 
                  className="" key={title}
                  > <Link className={HoverText}
                  key={component.title}
                  href={component.link}
                  >
                    <div className="text-sm">
                      <div className="">{component.title}</div>
                      <div className="text-gray-400">{component.description}</div>
                    </div>
                  </Link>
                  </div>
                ))}
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
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  })
  ListItem.displayName = "ListItem"
  