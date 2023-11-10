import type { Metadata } from 'next'
import { Gabarito } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { ModeToggle } from '@/components/ui/darkmode'
import DropDownMenu from "@/components/readyToUse/dropdown"
import NavigationBar from '@/components/readyToUse/navbar'
const gabarito = Gabarito({ subsets: ['latin'] })

import React from 'react'

export const metadata: Metadata = {
  title: 'PasarKripto',
  description: 'PasarKripto, Crypto, MarketCrypto',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={gabarito.className}>
        <div className="" id="Navbar">
          <ThemeProvider attribute="class" defaultTheme="dark">
            <div className="flex justify-center items-center gap-16 py-4">
              <Link href={"/"} className="text-3xl font-bold">
                PasarKripto
              </Link>
              <div className="md:hidden">
                <DropDownMenu />
              </div>
              <div className="hidden lg:block">
                <NavigationBar />
              </div>
              <ModeToggle />
            </div>
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout