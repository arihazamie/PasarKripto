"use client";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface Data {
  coins: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    large: string;
  }[];
}

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Data>();

  const onSearchSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (search) {
      axios
        .get<Data>(
          `https://api.coingecko.com/api/v3/search?query=${search}&per_page=10`
        )
        .then((res) => res.data)
        .then((data) => {
          setData(data);
        });
    }
  }, [search]);

  return (
    <div className="grid justify-center items-center">
      <div className="items-center justify-center w-full h-full">
        <Input
          placeholder="Search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSubmit={onSearchSubmit}
          className="z-50"
        />
        {data && (
          <div className="fixed z-50 md:-ml-60 -ml-36">
            <div className="border-2 rounded-lg p-5 bg-[#020817]/95 text-MyPurple drop-shadow-2xl">
              <ScrollArea className="md:h-72 md:w-[30rem] h-72 w-[17rem]">
                {data.coins.slice(0, 10).map((coin) => (
                  <div
                    key={coin.id}
                    className="w-full h-full hover:bg-MyPurple hover:rounded-xl hover:text-white">
                    <Link
                      href={`/cryptocurrencies/${coin.id}`}
                      onClick={() => setSearch("")}>
                      <div className="flex items-center justify-between w-full h-full">
                        <div className="flex gap-2">
                          <Image
                            src={coin.large}
                            width={64}
                            height={64}
                            alt="PasarKripto Image"
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex text-center items-center font-bold">
                            {coin.name}
                          </div>
                          <div className="flex text-center items-center">
                            {coin.symbol}
                          </div>
                        </div>
                        <div className="mr-10">#{coin.market_cap_rank}</div>
                      </div>
                    </Link>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
