import { DarkMode } from "@/components/ui/darkmode";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const Page = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <GiHamburgerMenu> </GiHamburgerMenu>
        </SheetTrigger>
        <SheetContent>
          <div className="">
            <div className="justify-center">
              <DarkMode />
            </div>
            <div className="flex flex-col">
              <div>
                <Accordion type="multiple">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Get Started</AccordionTrigger>
                    <AccordionContent className="text-base text-center hover:underline">
                      <Link href={"/cryptocurrencies"}>Cryptocurrencies</Link>
                    </AccordionContent>
                    <AccordionContent className="text-base text-center hover:underline">
                      <Link href={"/exchanges"}>Exchanges</Link>
                    </AccordionContent>
                    <AccordionContent className="text-base text-center hover:underline">
                      <Link href={"/trending"}>Trending</Link>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <Accordion type="multiple">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Components</AccordionTrigger>
                    <AccordionContent className="text-base text-center hover:underline">
                      <Link href={"/bitcoin-halving"}>Bitcoin Halving</Link>
                    </AccordionContent>
                    <AccordionContent className="text-base text-center hover:underline">
                      <Link href={"/exchange-rates"}>Exchange Rates</Link>
                    </AccordionContent>
                    <AccordionContent className="text-base text-center hover:underline">
                      <Link href={"/explorer"}>explorer</Link>
                    </AccordionContent>
                    <AccordionContent className="text-base text-center hover:underline">
                      <Link href={"/dominance"}>dominance</Link>
                    </AccordionContent>
                    <AccordionContent className="text-base text-center hover:underline">
                      <Link href={"/legal-tender"}>legal-tender</Link>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Page;
