"use client"
import "@/app/globals.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";
import Link from "next/link";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  rank: number;
  image: string;
  marketcap: number;
  volume24h: number;
  percentage1h: any;
  percentage24h: any;
  percentage7d: any;
}

const YourComponent: React.FC = () => {
  const [data, setData] = useState<CoinData[]>([]);

  useEffect(() => {
    async function fetchCoinData() {

      const api = `${process.env.NEXT_PUBLIC_API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`

      try {
        const response = await axios.get(api);
        setData(response.data.map((coin: any) => ({
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
        })));

      } catch (error) {
        console.error(error);
      }
    }
    fetchCoinData();
  }, []);

  return (
    <Table id="TableRanking" className="-z-50">
      <TableCaption>A list of coins.</TableCaption>
      <TableHeader>
        <TableRow className="">
          <TableHead>Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>1h%</TableHead>
          <TableHead>24h%</TableHead>
          <TableHead>7d%</TableHead>
          <TableHead>24h Volume</TableHead>
          <TableHead className="TableRanking3">Market Cap</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-auto -z-50">
      {data.map((coin: CoinData) => (
        <TableRow key={coin.id}>
          <TableCell>{coin.rank}.</TableCell>
          <Link href={"#"} className="flex gap-2 py-3">
            <Image src={coin.image} width={24} height={24} alt={coin.name}></Image>
            <span className="font-bold text-base">{coin.name}</span>
            <span className="text-gray-400 text-xs mt-1">{coin.symbol.toUpperCase()}</span></Link>
          <TableCell>{coin.price}</TableCell>
          <TableCell className={coin.percentage1h < 0 ? 'text-red-500' : 'text-green-500'}>{coin.percentage1h}</TableCell>
          <TableCell className={coin.percentage24h < 0 ? 'text-red-500' : 'text-green-500'}>{coin.percentage24h}</TableCell>
          <TableCell className={coin.percentage7d < 0 ? 'text-red-500' : 'text-green-500'}>{coin.percentage7d}</TableCell>
          <TableCell>{coin.volume24h}</TableCell>
          <TableCell className="TableRanking3">{coin.marketcap}</TableCell>
        </TableRow>
      ))}
      </TableBody>
      </Table>
  )
}

export default YourComponent