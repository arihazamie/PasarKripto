"use client"
import "@/app/globals.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface NFTData {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  nft_contract_id: number;
  native_currency_symbol: string;
  floor_price_in_native_currency: number;
  floor_price_24h_percentage_change: number;
}

interface ApiResponse {
  nfts: NFTData[];
}

const NFTApp: React.FC = () => {
  const [data, setData] = useState<NFTData[]>([]);

  useEffect(() => {
    async function fetchNFTData() {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/trending`;

      try {
        const response = await axios.get<ApiResponse>(url);

        // Map the API response data to the NFTData interface
        const nftData: NFTData[] = response.data.nfts.map((nft) => ({
          id: nft.id,
          name: nft.name,
          symbol: nft.symbol,
          thumb: nft.thumb,
          nft_contract_id: nft.nft_contract_id,
          native_currency_symbol: nft.native_currency_symbol,
          floor_price_in_native_currency: nft.floor_price_in_native_currency,
          floor_price_24h_percentage_change: nft.floor_price_24h_percentage_change,
        }));

        setData(nftData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchNFTData();
  }, []);

  return (
    <div className="border-2 rounded-lg mb-5">
      <div className="text-lg text-center mt-2">Top-5 trending NFTs based on the highest Trading Volume in the last 24 hours</div>
      <Table className="my-2">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Floor</TableHead>
            <TableHead>24h%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-auto">
          {data.map((nft: NFTData) => (
            <TableRow key={nft.id}>
              <div className="flex m-0 p-0">
                <Image src={nft.thumb} width={52} height={0} alt={nft.name}></Image>
                <TableCell className="font-bold text-base text-left">{nft.name}</TableCell>
                <TableCell className="text-gray-400">{nft.symbol}</TableCell>
              </div>
              <TableCell className="text-left">{nft.floor_price_in_native_currency.toFixed(3)} ETH</TableCell>
              <TableCell className={nft.floor_price_24h_percentage_change < 0 ? 'text-red-500 text-left' : 'text-green-500 text-left'}>{nft.floor_price_24h_percentage_change.toFixed(1)} %</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default NFTApp