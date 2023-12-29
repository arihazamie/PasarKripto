"use client";
import "@/app/globals.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [isLoading, setIsLoading] = useState(true);

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
          floor_price_24h_percentage_change:
            nft.floor_price_24h_percentage_change,
        }));

        setData(nftData);
      } catch (error) {}
    }

    fetchNFTData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div>
          <div>
            <Skeleton className="w-full h-[30rem] my-5" />
          </div>
        </div>
      ) : (
        <div className="md:border-2 border-none py-2 md:px-10 pb-5 rounded-md">
          <div className="text-lg text-center my-2">
            Top-5 trending NFTs based on the highest Trading Volume in the last
            24 hours
          </div>
          <div className="border-2 rounded-md bg-MyPurple/5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-10">Name</TableHead>
                  <TableHead className="">Symbol</TableHead>
                  <TableHead className="px-10">Floor</TableHead>
                  <TableHead className="px-10">24h%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="h-auto">
                {data.map((nft: NFTData) => (
                  <TableRow key={nft.id}>
                    <Link
                      href={`/nfts/${nft.id}`}
                      className="flex m-0 p-0">
                      <Image
                        src={
                          nft.thumb == "missing_small.png"
                            ? "/missing.png"
                            : nft.thumb
                        }
                        width={52}
                        height={0}
                        alt={nft.name}
                      />
                      <TableCell className="font-bold text-base text-left">
                        {nft.name}
                      </TableCell>
                    </Link>
                    <TableCell className="text-gray-400">
                      {nft.symbol}
                    </TableCell>
                    <TableCell className="text-left">
                      {nft.floor_price_in_native_currency.toFixed(3)} ETH
                    </TableCell>
                    <TableCell
                      className={
                        nft.floor_price_24h_percentage_change < 0
                          ? "text-red-500 text-left"
                          : "text-green-500 text-left"
                      }>
                      {nft.floor_price_24h_percentage_change.toFixed(1)} %
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default NFTApp;
