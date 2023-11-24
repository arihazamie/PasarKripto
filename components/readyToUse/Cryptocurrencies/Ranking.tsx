"use client"
import "@/app/globals.css"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from "next/image"
import Link from "next/link"
import { Button } from "../../ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/router"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Define an interface for the data
interface CoinData {
  id: string
  name: string
  symbol: string
  current_price: number
  market_cap_rank: number
  market_cap: number
  image: string
  total_volume: number
  price_change_percentage_1h_in_currency: number
  price_change_percentage_24h_in_currency: number
  price_change_percentage_7d_in_currency: number
}

const YourComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<CoinData[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCoinData() {

      try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${currentPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`
        const response = await axios.get(url)
        setData(response.data)
      } catch (error) {
        console.error(error)
        setError("Error fetching coin data")
      }
    }

    fetchCoinData()
  }, [currentPage])

  const handleNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1)
    }
  }
  return (
    <>
      <Table>
        <TableCaption>A list of coins.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead className="">Name</TableHead>
            <TableHead className="">Price</TableHead>
            <TableHead className="text-right">1h%</TableHead>
            <TableHead className="text-right">24h%</TableHead>
            <TableHead className="text-right">7d%</TableHead>
            <TableHead className="text-right">24h Volume</TableHead>
            <TableHead>Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((coin: CoinData) => (
            <TableRow key={coin.id}>
              <TableCell>{coin.market_cap_rank}.</TableCell>
              <TableCell>
                <Link href={`cryptocurrencies/${coin.id}`}>
                  <div className="flex gap-2 py-3">
                    <Image src={coin.image} width={24} height={24} alt={coin.name}></Image>
                    <span className="font-bold text-base">{coin.name}</span>
                    <span className="text-gray-400 text-xs mt-1">{coin.symbol.toUpperCase()}</span>
                  </div>
                </Link>
              </TableCell>
              <TableCell>${`${coin.current_price <= 0.0001 ? coin.current_price : coin.current_price.toLocaleString()}`}</TableCell>
              <TableCell className={coin.price_change_percentage_1h_in_currency <= 0 ? 'text-red-500' : 'text-green-500'}>{coin.price_change_percentage_1h_in_currency} %
              </TableCell>
              <TableCell className={coin.price_change_percentage_24h_in_currency <= 0 ? 'text-red-500' : 'text-green-500'}>{coin.price_change_percentage_24h_in_currency} %
              </TableCell>
              <TableCell className={coin.price_change_percentage_7d_in_currency <= 0 ? 'text-red-500' : 'text-green-500'}>{coin.price_change_percentage_7d_in_currency.toFixed(1)}
              </TableCell>
              <TableCell className="text-right">${coin.total_volume.toLocaleString()}</TableCell>
              <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="items-center justify-center text-center">
        <div>
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
          <span>Page {currentPage}</span>
          <Button onClick={handleNextPage}>Next</Button>
        </div>
      </div>
    </>
  )
}

export default YourComponent