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
  thumb: string;
  nft_contract_id: number;
  native_currency_symbol: string;
  floor_price_in_native_currency: number;
  floor_price_24h_percentage_change: number;
}

// Define the ApiResponse interface based on the structure of your API response
interface ApiResponse {
  coins: CoinData[];
}

const TrendingApp: React.FC = () => {
  const [data, setData] = useState<CoinData[]>([]);

  useEffect(() => {
    async function fetchCoinData() {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/trending`;

      try {
        const response = await axios.get<ApiResponse>(url);

        // Map the API response data to the CoinData interface
        const coinData: CoinData[] = response.data.coins.map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          thumb: coin.thumb,
          nft_contract_id: coin.nft_contract_id,
          native_currency_symbol: coin.native_currency_symbol,
          floor_price_in_native_currency: coin.floor_price_in_native_currency,
          floor_price_24h_percentage_change: coin.floor_price_24h_percentage_change,
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
      <Table id="TableRanking">
      <TableCaption>A list of coins.</TableCaption>
      <TableHeader>
        <TableRow>
        <TableHead>No</TableHead>
          <TableHead>Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-auto">
      {data.map((coin: CoinData) => (
        <TableRow key={coin.id}>
          <TableCell>{coin.name}</TableCell>
        </TableRow>
      ))}
      </TableBody>
      </Table>
    </>
  )
}

export default TrendingApp
