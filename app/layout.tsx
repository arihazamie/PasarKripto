import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { DarkMode } from "@/components/ui/darkmode";
import NavigationBar from "@/components/readyToUse/Navbar/navbar";
const gabarito = Gabarito({ subsets: ["latin"] });
import { SpeedInsights } from "@vercel/speed-insights/next";
import Image from "next/image";

import React from "react";
import NavbarAPI from "@/components/readyToUse/Navbar/navbarAPI";
import MobileNav from "@/components/readyToUse/Navbar/MobileNavbar";
import Logo from "./icon.png";
import Separator from "@/components/readyToUse/Navbar/Separator";
import SearchInput from "@/components/readyToUse/input";

//Logos
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaCopyright } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "PasarKripto",
  description: "PasarKripto is a Cryptocurrency tracking",
  publisher: "Ari Hazamie",
  applicationName: "PasarKripto",
  keywords: ["PasarKripto", "Crypto", "MarketCrypto"],
  authors: [{ name: "Ari Hazamie", url: "https://github.com/AriHazamie" }],
  creator: "Ari Hazamie",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={gabarito.className}>
        <div
          className="py-5"
          id="Navbar">
          <SpeedInsights />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark">
            <div className="flex justify-center items-center md:gap-12 gap-5 py-4">
              <Link
                href={{ pathname: "/" }}
                className="flex items-center gap-2">
                <Image
                  src={Logo}
                  width={64}
                  height={64}
                  alt="PasarKripto Image"
                  className="hover:animate-spin w-8 h-8 md:w-14 md:h-14"
                />
                <div className="md:text-3xl text-xl font-bold transition-all duration-300 hover:text-MyPurple">
                  PasarKripto
                </div>
              </Link>
              <div className="hidden md:block">
                <NavigationBar />
              </div>
              <div className="hidden md:block">
                <DarkMode />
              </div>
              <div>
                <SearchInput />
              </div>
              <div className="md:hidden">
                <MobileNav />
              </div>
            </div>
            <div>
              <NavbarAPI />
            </div>
            {children}
          </ThemeProvider>
        </div>
        <div className="bottom-0 left-0 w-full text-center text-slate-300 text-sm mt-10 hidden md:block">
          <Separator />
          <div className="mt-1">PasarKripto</div>
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
          <div className="flex justify-center items-center gap-1 mb-1">
            <FaCopyright /> 2023 PasarKripto. All Rights Reserved.
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
