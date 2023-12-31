"use client";
import "@/app/globals.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap_rank: number;
  market_cap: number;
  image: string;
  total_volume: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

const YourComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<CoinData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCoinData() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${currentPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`;
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError("Error fetching coin data");
      }
    }
    fetchCoinData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  const setPage1 = () => {
    setCurrentPage((currentPage) => currentPage - 2);
  };
  const setPage2 = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };
  const setPage3 = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };
  const setPage4 = () => {
    setCurrentPage((currentPage) => currentPage + 2);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  });

  return (
    <div>
      {isLoading ? (
        <div>
          <div className="mx-[30rem]">
            <Skeleton className="w-full h-10 my-5" />
          </div>
          <Skeleton className="w-full h-[40rem]" />
        </div>
      ) : (
        <div>
          <div>
            <div className="text-2xl font-bold text-center my-5">
              Cryptocurrencies
            </div>
            <Table className="bg-MyPurple/5">
              <ScrollArea className="w-full h-[40rem] border-2 rounded-md">
                <TableHeader className="-top-[2px] sticky md:text-base text-sm bg-MyPurple text-white">
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead className="md:px-10 px-24 text-left">
                      Name
                    </TableHead>
                    <TableHead className="text-left">Price</TableHead>
                    <TableHead>1H %</TableHead>
                    <TableHead>1D %</TableHead>
                    <TableHead>7D %</TableHead>
                    <TableHead>24H Volume</TableHead>
                    <TableHead>Market Cap</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((coin: CoinData) => (
                    <TableRow key={coin.id}>
                      <TableCell>{coin.market_cap_rank}.</TableCell>
                      <TableCell>
                        <Link href={`cryptocurrencies/${coin.id}`}>
                          <div className="flex gap-2">
                            <Image
                              src={coin.image}
                              width={64}
                              height={64}
                              alt={coin.name + "Image"}
                              className="rounded-full w-10 h-10"
                            />
                            <div className="flex flex-col">
                              <span className="font-bold text-base">
                                {coin.name}
                              </span>
                              <span className="text-gray-400 text-xs">
                                {coin.symbol.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>
                        $
                        {`${
                          coin.current_price <= 0.0001
                            ? coin.current_price
                            : coin.current_price.toLocaleString()
                        }`}
                      </TableCell>
                      <TableCell
                        className={
                          coin.price_change_percentage_1h_in_currency <= 0
                            ? "text-red-500 text-sm items-center gap-1 mt-[0.65rem]"
                            : "text-green-500 text-sm items-center gap-1 mt-[0.65rem]"
                        }>
                        {coin.price_change_percentage_1h_in_currency !==
                        null ? (
                          <div className="flex items-center gap-1">
                            <div>
                              {coin.price_change_percentage_1h_in_currency.toFixed(
                                2
                              )}{" "}
                            </div>
                            <div>
                              {coin.price_change_percentage_1h_in_currency >
                              0 ? (
                                <FaArrowUp className="text-green-500" />
                              ) : (
                                <FaArrowDown className="text-red-500" />
                              )}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </TableCell>
                      <TableCell
                        className={
                          coin.price_change_percentage_24h_in_currency <= 0
                            ? "text-red-500 text-sm items-center gap-1 mt-[0.65rem]"
                            : "text-green-500 text-sm items-center gap-1 mt-[0.65rem]"
                        }>
                        {coin.price_change_percentage_24h_in_currency !==
                        null ? (
                          <div className="flex items-center gap-1">
                            <div>
                              {coin.price_change_percentage_24h_in_currency.toFixed(
                                2
                              )}{" "}
                            </div>
                            <div>
                              {coin.price_change_percentage_24h_in_currency >
                              0 ? (
                                <FaArrowUp className="text-green-500" />
                              ) : (
                                <FaArrowDown className="text-red-500" />
                              )}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </TableCell>
                      <TableCell
                        className={
                          coin.price_change_percentage_7d_in_currency <= 0
                            ? "text-red-500 text-sm items-center gap-1 mt-[0.65rem]"
                            : "text-green-500 text-sm items-center gap-1 mt-[0.65rem]"
                        }>
                        {coin.price_change_percentage_7d_in_currency !==
                        null ? (
                          <div className="flex items-center gap-1">
                            <div>
                              {coin.price_change_percentage_7d_in_currency.toFixed(
                                2
                              )}{" "}
                            </div>
                            <div>
                              {coin.price_change_percentage_7d_in_currency >
                              0 ? (
                                <FaArrowUp className="text-green-500" />
                              ) : (
                                <FaArrowDown className="text-red-500" />
                              )}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </TableCell>
                      <TableCell>
                        ${coin.total_volume.toLocaleString()}
                      </TableCell>
                      <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </ScrollArea>
            </Table>
            <div className="mt-5 cursor-pointer">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={handlePrevPage} />
                  </PaginationItem>
                  <PaginationItem className={currentPage > 2 ? "" : "hidden"}>
                    <PaginationLink onClick={setPage1}>
                      {currentPage - 2}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem className={currentPage > 1 ? "" : "hidden"}>
                    <PaginationLink onClick={setPage2}>
                      {currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="bg-MyPurple/20 rounded-md">
                    <PaginationLink href="#">{currentPage}</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={setPage3}>
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={setPage4}>
                      {currentPage + 2}
                    </PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext onClick={handleNextPage} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
