import { ModeToggle } from "@/components/ui/darkmode"
import Link from "next/link"
import { GiHamburgerMenu } from "react-icons/gi";


import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
} from "@/components/ui/accordion"


const Page = () => {
    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <GiHamburgerMenu> </GiHamburgerMenu>
                </SheetTrigger>
                <SheetContent className="">
                    <div className="flex relative">
                        <div className="flex justify-end">
                            <ModeToggle />
                        </div>
                        <div className="">
                            <Accordion type="multiple">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Get Started</AccordionTrigger>
                                    <AccordionContent className="text-xl text-center hover:underline">
                                        <Link href={"/cryptocurrencies"}>Cryptocurrencies</Link>
                                    </AccordionContent>
                                    <AccordionContent className="text-xl text-center hover:underline">
                                        <Link href={"/exchanges"}>Exchanges</Link>
                                    </AccordionContent>
                                    <AccordionContent className="text-xl text-center hover:underline">
                                        <Link href={"/trending"}>Trending</Link>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                        </div>
                    </div>
                </SheetContent>
            </Sheet>

        </>
    )
}

export default Page