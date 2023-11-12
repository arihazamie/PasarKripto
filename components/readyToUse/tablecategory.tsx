"use client"
import "@/app/globals.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  id: number;
  name: string;
  market_cap_1h_change: number; // Update this field to match the actual data structure
  slug: string;
}

const TrendingApp: React.FC = () => {
  const [data, setData] = useState<CoinData[]>([]);

  useEffect(() => {
    async function fetchCoinData() {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/trending`;

      try {
        const response = await axios.get<{ categories: CoinData[] }>(url);

        setData(response.data.categories);
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
          <TableHead>Name</TableHead>
          <TableHead>1</TableHead>
          <TableHead>1h%</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {data.map((coin: CoinData) => (
        <TableRow key={coin.id}>
          <TableCell className="font-bold text-base">{coin.name}</TableCell>
          <TableCell className={coin.market_cap_1h_change < 0 ? 'text-red-500' : 'text-green-500'}>{coin.market_cap_1h_change.toFixed(2)}</TableCell>
        </TableRow>
      ))}
      </TableBody>
      </Table>
    </>
  )
}

export default TrendingApp