import type { Metadata } from 'next'
import { Gabarito } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { ModeToggle } from '@/components/ui/darkmode'
import NavigationBar from '@/components/readyToUse/Navbar/navbar'
const gabarito = Gabarito({ subsets: ['latin'] })
import { Analytics } from '@vercel/analytics/react';

import React from 'react'
import NavbarAPI from '@/components/readyToUse/Navbar/navbarAPI'
import { Input } from '@/components/ui/input'
import MobileNav from "@/components/readyToUse/Navbar/MobileNavbar"
import Logo from "./icon.png"
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'PasarKripto',
  description: 'PasarKripto, Crypto, MarketCrypto',
  publisher: 'Ari Hazamie',
  applicationName: 'PasarKripto',
  keywords: ['PasarKripto', 'Crypto', 'MarketCrypto'],
  authors: [{ name: 'Ari Hazamie', url: 'https://github.com/AriHazamie' }],
  creator: 'Ari Hazamie',
  openGraph: {
    title: 'PasarKripto',
    description: 'PasarKripto, Crypto, MarketCrypto',
    url: 'https://pasarkripto.vercel.app/',
    siteName: 'PasarKripto',
    countryName: 'Indonesia',
    images: [
      {
        url: 'https://pasarkripto.vercel.app/favicon.ico',
        width: 1920,
        height: 1080
      }
    ],
    locale: 'en-US',
    type: 'website'
  },
  metadataBase: new URL('https://pasarkripto.vercel.app/'),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
    date: false,
    url: true
  },
  category: 'Crypto',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true
    }
  },
  icons: {
    shortcut: './favicon.ico',
    icon: './favicon.ico'

  },
  alternates: {
    canonical: 'https://pasarkripto.vercel.app/',
    languages: {
      'en-US': 'https://pasarkripto.vercel.app/',
      'id-ID': 'https://pasarkripto.vercel.app/',
    }
  }
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <html lang="en">
      <body className={gabarito.className}>
        <div className="z-50" id="Navbar">
          <ThemeProvider attribute="class" defaultTheme="dark">
            <div className="flex justify-center items-center md:gap-12 gap-7 py-4">
              <Link href={"/"} className=" flex items-center gap-2">
                <Image src={Logo} width={50} height={50} alt='PasarKripto' className='hidden md:block' />
                <div className='md:text-3xl text-2xl font-bold transition-all duration-300 hover:text-MyPurple'>
                  PasarKripto
                </div>
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
            <Analytics />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout
