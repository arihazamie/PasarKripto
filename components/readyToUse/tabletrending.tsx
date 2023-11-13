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

// Define an interface for the data
interface Item {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  score: number;
}

interface CoinData {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  rank: number;
  image: string;
  score: number;
}

const TrendingApp: React.FC = () => {
  const [data, setData] = useState<CoinData[]>([]);

  useEffect(() => {
    async function fetchCoinData() {

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/trending`;

      try {
        const response = await axios.get<{ coins: { item: Item }[] }>(url);

        const coinData: CoinData[] = response.data.coins.map((coin) => ({
          id: coin.item.id,
          coin_id: coin.item.coin_id,
          name: coin.item.name,
          symbol: coin.item.symbol,
          rank: coin.item.market_cap_rank,
          image: coin.item.thumb,
          score: coin.item.score + 1,
        }));
        setData(coinData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }




    fetchCoinData();
  }, []);

  return (
    <>
      <div className=" text-xl">Top-7 trending Coins as Searched by Users in the last 24 hours</div>
      <Table id="TableRanking">
      <TableCaption>A list of coins.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-auto">
      {data.map((coin: CoinData) => (
        <TableRow key={coin.id}>
          <TableCell className="text-left">{coin.rank}.</TableCell>
          <div className="flex gap-2 py-3">
            <Image src={coin.image} width={24} height={24} alt={coin.name}></Image>
            <span className="font-bold text-base">{coin.name}</span>
            <span className="text-gray-400 text-xs mt-1">{coin.symbol.toUpperCase()}</span>
          </div>
        </TableRow>
      ))}
      </TableBody>
      </Table>
    </>
  )
}

export default TrendingApp
