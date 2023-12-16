"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";
import Not from "../../../app/icon.png";
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
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface data {
  id: string;
  name: string;
  market_cap: number;
  market_cap_change_24h: number;
  top_3_coins: string[];
  volume_24h: number;
}

const Categories = () => {
  const [data, setData] = useState<data[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const urlApi = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories`;
      try {
        const response = await axios.get<data[]>(urlApi);
        setData(response.data);
      } catch (error) {
        console.log(error + "Error fetching data");
      }
    }

    getData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="mx-10">
          <div className="mx-[25rem]">
            <Skeleton className="w-full h-10 my-10" />
          </div>
          <Skeleton className="w-full h-[40rem]" />
        </div>
      ) : (
        <div className="mx-10">
          <div className="my-10 text-center font-bold text-2xl">
            List all categories with market data
          </div>
          <Table>
            <ScrollArea className="w-full h-[30rem] rounded-md border-2 shadow">
              <TableHeader className="bg-MyPurple sticky top-0">
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Market Cap</TableHead>
                  <TableHead>Volume 24H</TableHead>
                  <TableHead>24H %</TableHead>
                  <TableHead className="md:px-0 px-14 border md:border-none text-center">
                    Top 3 Coins
                  </TableHead>
                </TableRow>
              </TableHeader>
              {data.map((data: data, index) => (
                <TableBody
                  key={index}
                  className={
                    data.market_cap === null || 0 ? "hidden" : "bg-MyPurple/5"
                  }>
                  <TableRow />
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-bold">{data.name}</TableCell>
                    <TableCell>
                      $
                      {data && data.market_cap
                        ? data.market_cap.toLocaleString()
                        : " 0"}
                    </TableCell>
                    <TableCell>
                      $
                      {data && data.volume_24h
                        ? data.volume_24h.toLocaleString()
                        : " 0"}
                    </TableCell>
                    <TableCell
                      className={
                        data.market_cap_change_24h <= 0
                          ? "text-red-500"
                          : "text-green-500"
                      }>
                      {data.market_cap_change_24h !== null ? (
                        <div className="flex items-center gap-1">
                          <div>{data.market_cap_change_24h.toFixed(2)} </div>
                          <div>
                            {data.market_cap_change_24h > 0 ? (
                              <FaArrowUp className="text-green-500" />
                            ) : (
                              <FaArrowDown className="text-red-500" />
                            )}
                          </div>
                        </div>
                      ) : (
                        "0"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 items-center text-center justify-center">
                        {data.top_3_coins.map((coin, index) => (
                          <div
                            key={index}
                            className="flex-initial">
                            <Image
                              src={
                                coin == "missing_small.png" || null || ""
                                  ? Not
                                  : coin
                              }
                              width={64}
                              height={64}
                              alt={data.name + "Image"}
                              className="rounded-full w-8 h-8"
                              priority={true}
                            />
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </ScrollArea>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Categories;
