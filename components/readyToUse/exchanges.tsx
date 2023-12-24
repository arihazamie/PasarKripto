"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import balancer from "@/public/Image/balancer-v2-avalanche.jpg";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";

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

export interface Exchange {
  id: string;
  name: string;
  trust_score_rank: number;
  image: string;
  trust_score: number;
  trade_volume_24h_btc: number;
}

interface CoinData {
  market_data: {
    current_price: {
      usd: number;
    };
  };
}

const ExchangesApp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exchangeData, setExchangeData] = useState<Exchange[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/exchanges?per_page=100&page=${currentPage}`;

    setIsLoading(true);

    axios
      .get(apiUrl)
      .then((response) => {
        setExchangeData(response.data);
      })
      .catch((error) => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage >= 2) {
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
    <div className="mx-5">
      {isLoading ? (
        <div>
          <div className="mx-[30rem]">
            <Skeleton className="w-full h-10 my-5" />
          </div>
          <Skeleton className="w-full h-[40rem]" />
        </div>
      ) : (
        <div className="">
          <div className="text-2xl font-bold text-center my-5">Exchanges</div>
          <Table className="w-full h-auto bg-MyPurple/5">
            <ScrollArea className="w-full h-[32rem] rounded-md border-2">
              <TableHeader className="sticky top-0 bg-MyPurple text-white">
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead className="md:px-0 px-10">Name</TableHead>
                  <TableHead className="text-center">Trust Score</TableHead>
                  <TableHead className="md:px-0 px-10 flex gap-2 text-center justify-center items-center">
                    <div>Volume</div> <div>24h</div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exchangeData.map((exchange) => (
                  <TableRow key={exchange.id}>
                    <TableCell>{exchange.trust_score_rank}</TableCell>
                    <Link
                      href={`/exchanges/${exchange.id}`}
                      className="flex text-left"
                      prefetch>
                      <Image
                        src={
                          exchange.image === "missing_small.png"
                            ? balancer
                            : exchange.image
                        }
                        width={64}
                        height={64}
                        alt={exchange.name}
                        priority
                        className="md:w-11 md:h-11 w-11 h-11 mt-2 rounded-full"
                      />
                      <TableCell className="md:font-bold md:text-base text-xs">
                        {exchange.name}
                      </TableCell>
                    </Link>
                    <TableCell className="text-center">
                      {exchange.trust_score ?? "null"}
                    </TableCell>
                    <TableCell className="text-green-500 text-center">
                      {exchange.trade_volume_24h_btc.toFixed()} BTC
                    </TableCell>
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
      )}
    </div>
  );
};

export default ExchangesApp;
