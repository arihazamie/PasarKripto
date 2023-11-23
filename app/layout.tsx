import type { Metadata } from 'next'
import { Gabarito } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { ModeToggle } from '@/components/ui/darkmode'
import DropDownMenu from "@/components/readyToUse/dropdown"
import NavigationBar from '@/components/readyToUse/Navbar/navbar'
const gabarito = Gabarito({ subsets: ['latin'] })

import React from 'react'
import NavbarAPI from '@/components/readyToUse/Navbar/navbarAPI'
import { Input } from '@/components/ui/input'
import MobileNav from "@/components/readyToUse/Navbar/MobileNavbar"

export const metadata: Metadata = {
  title: 'PasarKripto',
  description: 'PasarKripto, Crypto, MarketCrypto',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <html lang="en">
      <body className={gabarito.className}>
        <div className="z-50" id="Navbar">
          <ThemeProvider attribute="class" defaultTheme="dark">
            <div className="flex justify-center items-center md:gap-16 gap-7 py-4">
              <Link href={"/"} className="md:text-3xl text-2xl font-bold transition-all duration-300 hover:text-MyPurple">
                PasarKripto
              </Link>
              <div className="hidden lg:block">
                <NavigationBar />
              </div>
              <Input />
              <div className="md:hidden">
                <MobileNav />
              </div>
              <div className="hidden md:block">
                <ModeToggle />
              </div>
            </div>
            <NavbarAPI />
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout
