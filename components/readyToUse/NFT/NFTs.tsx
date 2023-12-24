"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
interface data {
  id: string;
  name: string;
  symbol: string;
  asset_platform_id: string;
}

const NFTs = () => {
  const [data, setData] = useState<data[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlApi = `${process.env.NEXT_PUBLIC_API_BASE_URL}/nfts/list?order=market_cap_usd_desc&per_page=100&page=${currentPage}&sparkline=false`;
    async function getData() {
      try {
        const response = await axios.get<data[]>(urlApi);
        setData(response.data);
      } catch (error) {}
    }

    getData();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
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
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="mx-5">
          <div className="mx-[30rem]">
            <Skeleton className="w-full h-10 my-5" />
          </div>
          <Skeleton className="w-full h-[40rem]" />
        </div>
      ) : (
        <div>
          <div className="my-5 text-2xl font-bold text-center">
            List of all NFTs
          </div>
          <div className="mx-5">
            <Table className="my-5">
              <ScrollArea className="w-full border-2 shadow rounded-md h-[30rem]">
                <TableHeader className="bg-MyPurple sticky top-0">
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Network</TableHead>
                  </TableRow>
                </TableHeader>
                {data.map((data: data, index) => (
                  <TableBody
                    key={index}
                    className="bg-MyPurple/5">
                    <TableRow>
                      <TableCell>
                        {currentPage > 1
                          ? index + 1 + (currentPage - 1) * 100
                          : index + 1}
                      </TableCell>
                      <div className="mt-4">
                        <Link
                          href={`/nfts/${data.id}`}
                          className="font-bold">
                          {data.name}
                        </Link>
                      </div>
                      <TableCell>
                        <Link href={`/nfts/${data.id}`}>{data.symbol}</Link>
                      </TableCell>
                      <TableCell>
                        {data.asset_platform_id.toLocaleUpperCase()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
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

export default NFTs;
