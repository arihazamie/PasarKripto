"use client";
import "@/app/globals.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

// Define an interface for the data
interface Item {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  data: {
    price: string;
    price_change_percentage_24h: {
      usd: number;
    };
  };
}

interface CoinData {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  rank: number;
  image: string;
  price: any; // Add this line
  percentage24h: any; // Add this line
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
          price: coin.item.data.price,
          percentage24h:
            coin.item.data.price_change_percentage_24h?.usd?.toFixed(2),
        }));
        setData(coinData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchCoinData();
  }, []);

  return (
    <>
      <div className="text-center text-lg mt-2">Trending Coins</div>
      <Table id="TableRanking">
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>24H</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-auto">
          {data.slice(0, 7).map((coin: CoinData, index: number) => (
            <TableRow key={coin.id}>
              <TableCell className="text-left">{index + 1}.</TableCell>
              <Link
                href={`/cryptocurrencies/${coin.id}`}
                className="flex gap-2 py-3">
                <Image
                  src={coin.image}
                  width={24}
                  height={24}
                  alt={coin.name}
                  priority
                />
                <span className="font-bold text-base">{coin.name}</span>
                <span className="text-gray-400 text-xs mt-1">
                  {coin.symbol.toUpperCase()}
                </span>
              </Link>
              <TableCell className="text-MyPurple">
                {coin.percentage24h} %
              </TableCell>
              <TableCell>{coin.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TrendingApp;
