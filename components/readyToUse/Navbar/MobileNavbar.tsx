"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DarkMode } from "@/components/ui/darkmode";
import IconPasarKripto from "@/app/icon.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaCopyright } from "react-icons/fa6";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const HoverText =
    "hover:font-bold duration-300 transition-all hover:text-[14.5px]";

  return (
    <div className="flex lg:hidden">
      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon">
            <Menu />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="px-2 flex flex-col gap-4">
            <div className="flex items-center justify-center text-center gap-5">
              <div>
                <Link
                  href="/"
                  className="flex items-center font-bold text-3xl hover:text-MyPurple hover:transition-all hover:duration-300"
                  onClick={() => setIsOpen(false)}>
                  PasarKripto
                </Link>
              </div>
              <div className="py-5">
                <DarkMode />
              </div>
            </div>
            <div className="text-sm">
              <Accordion
                type="multiple"
                defaultValue={["item-1", "item-2"]}
                className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="hover:font-bold duration-300 transition-all hover:text-[20.5px]">
                    Cryptocurrencies
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-y-2 text-muted-foreground">
                      <Link
                        onClick={() => setIsOpen(false)}
                        href="/cryptocurrencies"
                        className={HoverText}>
                        Cryptocurrencies
                      </Link>
                      <Link
                        onClick={() => setIsOpen(false)}
                        href="/exchanges"
                        className={HoverText}>
                        Exchanges
                      </Link>
                      <Link
                        onClick={() => setIsOpen(false)}
                        href="/trending"
                        className={HoverText}>
                        Trending
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="hover:font-bold duration-300 transition-all hover:text-[20.5px]">
                    Categories
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-y-2 text-muted-foreground">
                      <Link
                        onClick={() => setIsOpen(false)}
                        href="/bitcoin-halving"
                        className={HoverText}>
                        Bitcoin Halving
                      </Link>
                      <Link
                        onClick={() => setIsOpen(false)}
                        href="/explorer"
                        className={HoverText}>
                        Explorer
                      </Link>
                      <Link
                        onClick={() => setIsOpen(false)}
                        href="/dominance"
                        className={HoverText}>
                        Dominance
                      </Link>
                      <Link
                        onClick={() => setIsOpen(false)}
                        href="/academy"
                        className={HoverText}>
                        Learn
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <div>
                  <Image
                    src={IconPasarKripto}
                    height={64}
                    width={64}
                    alt="PasarKripto Icon Logo"
                    className="ml-20 mt-10"
                  />
                  <div>
                    <div className="flex justify-center items-center gap-5 my-3">
                      <div>
                        <Link
                          href={"https://github.com/arihazamie"}
                          target="_blank"
                          className="flex justify-center items-center gap-1 hover:text-MyPurple text-xl"
                          aria-label="Github">
                          <FaGithub alt="Github Image" />
                        </Link>
                      </div>
                      <div>
                        <Link
                          href={"https://www.linkedin.com/in/arihazamie/"}
                          target="_blank"
                          className="flex justify-center items-center gap-1 hover:text-MyPurple text-xl"
                          aria-label="Linkedin">
                          <FaLinkedin alt="Linkedin Image" />
                        </Link>
                      </div>
                      <div>
                        <Link
                          href={"mailto:arihzmii@gmail.com"}
                          target="_blank"
                          className="flex justify-center items-center gap-1 hover:text-MyPurple text-xl"
                          aria-label="Mail">
                          <MdOutlineMail alt="Mail Image" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="justify-center items-center text-center mt-5">
                    <div className="flex justify-center items-center gap-1">
                      <FaCopyright /> 2023 PasarKripto.
                    </div>
                    <div>All Rights Reserved.</div>
                  </div>
                </div>
              </Accordion>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
