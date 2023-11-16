"use client"
import "@/app/globals.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

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
  id: string;
  name: string;
  symbol: string;
  price: string; // Change the type to string
  rank: number;
  marketcap: string; // Change the type to string
  image: string;
  volume24h: number; // Change the type to string
  percentage1h: number;
  percentage24h: number;
  percentage7d: number;
}

const YourComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCoinData() {
      setLoading(true);
      setError(null);

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${currentPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`;

      console.log(currentPage)

      try {
        const response = await axios.get(url);
        setData(
          response.data.map((coin: any) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            price: coin.current_price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            }),
            rank: coin.market_cap_rank,
            marketcap: coin.market_cap.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            }),
            image: coin.image,
            volume24h: coin.total_volume.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            }),
            percentage1h: coin.price_change_percentage_1h_in_currency.toFixed(1),
            percentage24h: coin.price_change_percentage_24h_in_currency.toFixed(1),
            percentage7d: coin.price_change_percentage_7d_in_currency.toFixed(1),
          }))
        );
      } catch (error) {
        console.error(error);
        setError('Limit');
      } finally {
        setLoading(false);
      }
    }

    fetchCoinData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage >= 2) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  return (
    <>
      <Table>
        <TableCaption>A list of coins.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>1h%</TableHead>
            <TableHead>24h%</TableHead>
            <TableHead>7d%</TableHead>
            <TableHead>24h Volume</TableHead>
            <TableHead>Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((coin: CoinData) => (
            <TableRow key={coin.id}>
              <TableCell>{coin.rank}.</TableCell>
              <Link href={`ranking/${coin.id}`} className="flex gap-2 py-3">
                <Image src={coin.image} width={24} height={24} alt={coin.name}></Image>
                <span className="font-bold text-base">{coin.name}</span>
                <span className="text-gray-400 text-xs mt-1">{coin.symbol.toUpperCase()}</span></Link>
              <TableCell>{coin.price}</TableCell>
              <TableCell className={coin.percentage1h < 0.0 ? 'text-red-500' : 'text-green-500'}>{coin.percentage1h} %</TableCell>
              <TableCell className={coin.percentage24h < 0.0 ? 'text-red-500' : 'text-green-500'}>{coin.percentage24h} %</TableCell>
              <TableCell className={coin.percentage7d < 0.0 ? 'text-red-500' : 'text-green-500'}>{coin.percentage7d} %</TableCell>
              <TableCell>{coin.volume24h}</TableCell>
              <TableCell>{coin.marketcap}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="items-center justify-center text-center">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
          <span>Page {currentPage}</span>
          <Button onClick={handleNextPage} disabled={currentPage === 4}>Next</Button>
        </div>
      </div>
    </>
  )
}

export default YourComponent