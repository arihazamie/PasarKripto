"use client";

import * as React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { title } from "process";

const components: { title: string; link: string; description: string }[] = [
  {
    title: "Bitcoin Halving",
    link: "/bitcoin-halving",
    description:
      "prescheduled event where the reward for mining and verifying new blocks is reduced by 50%.",
  },
  {
    title: "Exchange Rates",
    link: "/exchange-rates",
    description: "Bitcoin rate converted to Fiat Currency.",
  },
  {
    title: "Explorer",
    link: "/explorer",
    description: "let's track your transactions easily.",
  },
  {
    title: "Dominance",
    link: "/dominance",
    description: "Strength compared to other cryptocurrencies.",
  },
  {
    title: "Exchange",
    link: "/exchanges",
    description: "globally listed exchanges.",
  },
  {
    title: "Learn",
    link: "/academy",
    description: "Learn about Cryptocurrency with PasarKripto Academy.",
  },
];

export default function NavigationBar() {
  const HoverText =
    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl hover:text-[#7071E8]  hover:bg-MyPurple/10 transition-all duration-300">
            Cryptocurrency
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/">
                    <div className="mb-2 mt-4 text-lg font-medium">
                      PasarKripto
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      A platform that provides precise and easy-to-understand
                      crypto market information.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <Link
                href="/cryptocurrencies"
                className={HoverText}>
                <div className="text-sm">
                  <div>Cryptocurrencies</div>
                  <div className="text-gray-400">
                    Cryptocurrency Prices by Market Cap
                  </div>
                </div>
              </Link>
              <Link
                href="/exchanges"
                className={HoverText}>
                <div className="text-sm">
                  <div>Exchanges</div>
                  <div className="text-gray-400">
                    Crypto Exchanges Ranked by Trust Score
                  </div>
                </div>
              </Link>
              <Link
                href="/trending"
                className={HoverText}>
                <div className="text-sm">
                  <div>Trending</div>
                  <div className="text-gray-400">Top Trending in 24H</div>
                </div>
              </Link>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl hover:text-[#7071E8] hover:bg-MyPurple/10 transition-all duration-300">
            Components
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <div
                  className=""
                  key={title}>
                  {" "}
                  <Link
                    className={HoverText}
                    key={component.title}
                    href={component.link}>
                    <div className="text-sm">
                      <div className="">{component.title}</div>
                      <div className="text-gray-400">
                        {component.description}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
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
          {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
