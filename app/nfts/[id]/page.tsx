"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { FaXTwitter, FaDiscord } from "react-icons/fa6";
import { BsGlobe2 } from "react-icons/bs";
interface PageProps {
  params: {
    id: string;
  };
}

interface NFT {
  id: string;
  contract_address: string;
  asset_platform_id: string;
  name: string;
  symbol: string;
  total_supply: number;
  image: {
    small: string;
  };
  native_currency: string;
  native_currency_symbol: string;
  floor_price: {
    native_currency: number;
    usd: number;
  };
  market_cap: {
    native_currency: number;
    usd: number;
  };
  one_day_sales: number;
  volume_24h: {
    native_currency: number;
    usd: number;
  };
  floor_price_in_usd_24h_percentage_change: number;
  floor_price_24h_percentage_change: {
    usd: number;
    native_currency: number;
  };
  market_cap_24h_percentage_change: {
    usd: number;
    native_currency: number;
  };
  volume_24h_percentage_change: {
    usd: number;
    native_currency: number;
  };
  number_of_unique_addresses: number;
  links: {
    homepage: string;
    twitter: string;
    discord: string;
  };
  floor_price_7d_percentage_change: {
    usd: number;
    native_currency: number;
  };
  floor_price_14d_percentage_change: {
    usd: number;
    native_currency: number;
  };
  floor_price_30d_percentage_change: {
    usd: number;
    native_currency: number;
  };
  floor_price_60d_percentage_change: {
    usd: number;
    native_currency: number;
  };
  floor_price_1y_percentage_change: {
    usd: number;
    native_currency: number;
  };
  explorers: [name: string, link: string];
  one_day_sales_24h_percentage_change: number;
}

const Page: React.FC<PageProps> = ({ params: { id } }) => {
  const [data, setData] = useState<NFT>();
  const [isLoading, setIsLoading] = useState(true);
  const API = `https://api.coingecko.com/api/v3/nfts/${id}`;
  useEffect(() => {
    async function GetData() {
      try {
        const response = await axios.get<NFT>(API);
        setData(response.data);
      } catch (error) {
        error;
      }
    }
    GetData();
  }, [API]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div>
          <div className="flex justify-center">
            <Skeleton className="w-40 h-8 my-5" />
          </div>
          <div className="flex justify-center gap-4">
            <Skeleton className="w-20 h-20 my-5 rounded-xl" />
            <Skeleton className="w-72 h-20 my-5" />
          </div>
          <div className="flex justify-center gap-5">
            <Skeleton className="w-64 h-16" />
            <Skeleton className="w-64 h-16" />
            <Skeleton className="w-64 h-16" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="w-72 h-44 my-5" />
          </div>
        </div>
      ) : (
        <div className="mx-10">
          {data && (
            <div>
              <div className="text-center items-center justify-center flex mt-5 md:mt-10 gap-2">
                <Link
                  href={"/nfts"}
                  className="hover:underline-offset-4 hover:underline hover:text-MyPurple">
                  nfts
                </Link>
                <div>{" > "}</div>
                <div className="text-gray-400">{id}</div>
              </div>
              <div className="md:flex grid justify-center items-center text-center gap-5 my-5">
                <span className="grid text-center items-center justify-center">
                  <Image
                    src={data.image.small}
                    width={64}
                    height={64}
                    alt={data.name + "Image"}
                    className="rounded-xl"
                  />
                </span>
                <span className="text-3xl font-bold">{data.name}</span>
                <span>{data.symbol}</span>
              </div>
              <div>
                <div className="md:flex grid md:gap-10 gap-5 items-center justify-center text-center my-5">
                  <div className="p-2 border-2 rounded-lg w-56 text-center bg-MyPurple/5 shadow">
                    <div>
                      {data.floor_price.native_currency}{" "}
                      {data.native_currency_symbol}{" "}
                      <span
                        className={
                          data.floor_price_in_usd_24h_percentage_change <= 0
                            ? "text-red-400"
                            : "text-green-400"
                        }>
                        {data.floor_price_in_usd_24h_percentage_change.toFixed(
                          1
                        )}{" "}
                        %
                      </span>
                    </div>
                    <div className="text-slate-400">
                      Floor Price : ${data.floor_price.usd.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-2 border-2 rounded-lg w-56 text-center bg-MyPurple/5 shadow">
                    <div>
                      {data.volume_24h.native_currency}{" "}
                      {data.native_currency_symbol}{" "}
                      <span
                        className={
                          data.volume_24h_percentage_change.usd <= 0
                            ? "text-red-400"
                            : "text-green-400"
                        }>
                        {data.volume_24h_percentage_change.usd.toFixed(1)} %
                      </span>
                    </div>
                    <div className="text-slate-400">
                      24H Volume : ${data.volume_24h.usd.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-2 border-2 rounded-lg w-56 text-center bg-MyPurple/5 shadow">
                    <div>
                      {data.market_cap.native_currency.toLocaleString()}{" "}
                      {data.native_currency_symbol}{" "}
                      <span
                        className={
                          data.market_cap_24h_percentage_change.usd <= 0
                            ? "text-red-400"
                            : "text-green-400"
                        }>
                        {data.market_cap_24h_percentage_change.usd.toFixed(1)} %
                      </span>
                    </div>
                    <div className="text-slate-400">
                      Market Cap : ${data.market_cap.usd.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-10 justify-center">
                <div className="w-72 border-2 rounded-lg bg-MyPurple/5 p-5">
                  <span className="flex text-center justify-center items-center font-bold">
                    {data.name} Statistics
                  </span>
                  <div className="flex my-2">
                    <div className="w-1/2 text-left text-slate-400">
                      <div>Total Supply</div>
                      <div>Owners</div>
                      <div>24H Sales</div>
                    </div>
                    <div className="w-2/4 text-right text-MyPurple">
                      <div>{data.total_supply.toLocaleString()}</div>
                      <div>
                        {data.number_of_unique_addresses.toLocaleString()}
                      </div>
                      <div>
                        {data.one_day_sales}{" "}
                        <span
                          className={
                            data.one_day_sales_24h_percentage_change <= 0
                              ? "text-red-400"
                              : "text-green-400"
                          }>
                          {data.one_day_sales_24h_percentage_change}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-10 my-5">
                <Link
                  href={`${data.links.homepage}`}
                  target="_blank"
                  className={
                    data.links.homepage == null || ""
                      ? "hidden"
                      : data.links.homepage
                  }>
                  <Button
                    variant={"purple"}
                    className="gap-2">
                    <BsGlobe2 /> Website
                  </Button>
                </Link>
                <Link
                  href={`${data.links.twitter}`}
                  target="_blank"
                  className={
                    data.links.twitter == null || ""
                      ? "hidden"
                      : data.links.twitter
                  }>
                  <Button
                    variant={"purple"}
                    className="gap-2">
                    <FaXTwitter /> Twitter
                  </Button>
                </Link>
                <Link
                  href={`${data.links.discord}`}
                  target="_blank"
                  className={
                    data.links.discord == null || ""
                      ? "hidden"
                      : data.links.discord
                  }>
                  <Button
                    variant={"purple"}
                    className="gap-2">
                    <FaDiscord /> Discord
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
