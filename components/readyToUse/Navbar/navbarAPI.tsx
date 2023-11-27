"use client"
// NavbarAPI.tsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GasTracker from './Gas'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

type GlobalData = {
  active_cryptocurrencies: number
  markets: number
  market_cap_change_percentage_24h_usd: any
  market_cap_percentage: any
  total_market_cap: {
    usd: number
  }
  total_volume: {
    usd: number
  }
}

const abbreviateNumber = (value: number, decimalPlaces: number): string => {
  const suffixes = ["", "K", "M", "B", "T"]
  const tier = Math.log10(Math.abs(value)) / 3 | 0

  if (tier === 0) return value.toFixed(decimalPlaces)

  const suffix = suffixes[tier]
  const scale = Math.pow(10, tier * 3)

  const scaledValue = value / scale

  return `${scaledValue.toFixed(decimalPlaces)}${suffix}`
}

const NavbarAPI: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<GlobalData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        setTimeout(async () => {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/global`)
          const { active_cryptocurrencies, markets, market_cap_change_percentage_24h_usd, market_cap_percentage, total_market_cap, total_volume } = response.data.data
          setData({ active_cryptocurrencies, markets, market_cap_change_percentage_24h_usd, market_cap_percentage, total_market_cap, total_volume })
          setIsLoading(false)
        }, 200)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const dom = data?.market_cap_percentage

  if (!dom) {
    return (
      <div className='flex gap-5 items-center text-center justify-center'>
        <Skeleton className='w-36 h-10' />
        <Skeleton className='w-36 h-10' />
        <Skeleton className='w-36 h-10' />
        <Skeleton className='w-36 h-10' />
        <Skeleton className='w-36 h-10' />
        <Skeleton className='w-36 h-10' />
        <Skeleton className='w-36 h-10' />
      </div>
    )
  }

  return (
    <div className='w-full border-b-2 text-sm'>
      {data && (
        <div className={'flex md:gap-20 gap-32 text-center items-center justify-center shadow-sm md:mx-10 mx-0'}>
          <Link href={"/ranking"} className="transition-all duration-300 hover:text-[#7071E8]">
            <span className="text-gray-400">Cryptos: </span>
            {data.active_cryptocurrencies}
          </Link>
          <Link href={"/exchanges"} className="transition-all duration-300 hover:text-[#7071E8]">
            <span className='text-gray-400'>Exchanges: </span>
            {data.markets}
          </Link>
          <Link href={"#"} className="transition-all duration-300 hover:text-[#7071E8]">
            <span className='text-gray-400'>Market Cap: </span>
            <span>${abbreviateNumber(data.total_market_cap.usd, 3)} </span>
            <span
              className={data.market_cap_change_percentage_24h_usd < 0 ? 'text-red-500' : 'text-green-500'}>
              {data.market_cap_change_percentage_24h_usd.toFixed(2)}%
            </span>
          </Link>
          <Link href={"#"} className="transition-all duration-300 hover:text-[#7071E8]">
            <span className='text-gray-400'>24h Vol: </span>
            <span>${abbreviateNumber(data.total_volume.usd, 1)}</span>
          </Link>
          <Link href={"/dominance"} className="transition-all duration-300 hover:text-[#7071E8]">
            <p>
              <span className='text-gray-400'>Dominance: </span>
              BTC: {dom.btc.toFixed(1)}%
            </p>
          </Link>
          <GasTracker />
        </div>
      )}
    </div>
  )
}

export default NavbarAPI
