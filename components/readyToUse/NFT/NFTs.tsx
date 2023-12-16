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

interface data {
  id: string;
  name: string;
  symbol: string;
  asset_platform_id: string;
}

const NFTs = () => {
  const [data, setData] = useState<data[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlApi = `https://api.coingecko.com/api/v3/nfts/list?order=market_cap_usd_desc&per_page=100&page=${page}&sparkline=false`;
    async function getData() {
      try {
        const response = await axios.get<data[]>(urlApi);
        setData(response.data);
      } catch (error) {
        console.log(error + "Error fetching data");
      }
    }

    getData();
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  const handleNext = () => {
    setPage((page) => page + 1);
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
                        {page > 1 ? index + 1 + (page - 1) * 100 : index + 1}
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
            <div className="text-center flex justify-center items-center">
              <Button
                variant={"purple"}
                onClick={handlePrevious}
                disabled={page === 1}>
                Previous
              </Button>
              <div className="mx-3">{page}</div>
              <Button
                variant={"purple"}
                onClick={handleNext}>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTs;
