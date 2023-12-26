"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Hovers from "@/components/readyToUse/HoverAlert/ranking";
import { Skeleton } from "@/components/ui/skeleton";
import { FaCircle } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { ScrollArea } from "@/components/ui/scroll-area";

import { BsGlobe2 } from "react-icons/bs";
import { FaReddit, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import React from "react";

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
import { Button } from "@/components/ui/button";
import { MdOutlineOpenInNew } from "react-icons/md";

interface PageProps {
  params: {
    id: string;
  };
}

interface PageData {
  name: string;
  symbol: string;
  image: {
    large: string;
  };
  market_cap_rank: number;
  market_data: {
    current_price: {
      usd: number;
    };
    ath: {
      usd: number;
    };
    ath_change_percentage: {
      usd: number;
    };
    ath_date: {
      usd: string;
    };
    atl: {
      usd: number;
    };
    atl_change_percentage: {
      usd: number;
    };
    atl_date: {
      usd: string;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
    price_change_percentage_24h: number;
    fully_diluted_valuation: {
      usd: number;
    };
  };
  tickers: {
    base: string;
    target: string;
    trust_score: string;
    market: {
      name: string;
      identifier: string;
    };
    last: number;

    converted_volume: {
      usd: number;
    };
  }[];
  links: {
    twitter_screen_name: string;
    subreddit_url: string;
    homepage: string;
    blockchain_site: string;
    repos_url: {
      github: string;
    };
  };
  categories: string;
}

const Page: React.FC<PageProps> = ({ params: { id } }) => {
  const [data, setData] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${id}?localization=true&tickers=true&market_data=true`;

      try {
        setTimeout(async () => {
          const response = await axios.get<PageData>(url);
          setData(response.data);
          setIsLoading(false);
        }, 200);
      } catch (error) {}
    }

    getData();
  }, [id]);

  const athDate = () => {
    const date = data?.market_data.ath_date;
    if (date) {
      return date.usd;
    }
  };
  const formattedAthDate = athDate()
    ? new Date(athDate()!).toLocaleDateString("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const atlDate = () => {
    const date = data?.market_data.atl_date;
    if (date) {
      return date.usd;
    }
  };
  const formattedAtlDate = atlDate()
    ? new Date(atlDate()!).toLocaleDateString("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const dom = data?.market_data;

  if (!dom) {
    return (
      <>
        <div className="text-center items-center justify-center flex">
          <Skeleton className="w-36 h-10 mt-16" />
        </div>
        <div className="text-center items-center justify-center flex">
          <Skeleton className="w-96 h-10 mt-5" />
        </div>
        <div className="text-center items-center justify-center flex gap-10">
          <Skeleton className="w-28 h-10 mt-10" />
          <Skeleton className="w-28 h-10 mt-10" />
          <Skeleton className="w-28 h-10 mt-10" />
        </div>
        <div className="md:flex block text-left gap-4 mx-52">
          <div className="w-1/2">
            <Skeleton className="w-full h-10 mt-3" />
            <Skeleton className="w-full h-10 mt-3" />
            <Skeleton className="w-full h-10 mt-3" />
          </div>
          <div className="w-1/2">
            <Skeleton className="w-full h-10 mt-3" />
            <Skeleton className="w-full h-10 mt-3" />
            <Skeleton className="w-full h-10 mt-3" />
          </div>
        </div>
        <div>
          <Skeleton className="mx-[33rem] h-10 mt-3" />
          <Skeleton className="mx-[27rem] h-10 mt-3" />
          <Skeleton className="mx-[27rem] h-10 mt-3" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="text-center items-center justify-center flex mt-5 md:mt-10 gap-2">
        <Link
          href={"/cryptocurrencies"}
          className="hover:underline-offset-4 hover:underline hover:text-MyPurple">
          Cryptocurrencies
        </Link>
        <div>{" > "}</div>
        <div className="text-gray-400">{id}</div>
      </div>
      {data && (
        <div className="text-center items-center justify-center mt-5 md:mt-10 md:mx-52">
          <div className="bg-MyPurple md:mx-96 mx-36 py-1 rounded shadow text-white">
            Rank : {data.market_cap_rank}
          </div>
          <div className="flex justify-center items-center gap-2 my-3">
            <Image
              src={data.image.large}
              width={50}
              height={50}
              alt={data.name}
            />
            <div className="text-2xl font-bold">{data.name}</div>
            <div className="text-gray-400">{data.symbol.toUpperCase()}</div>
            <div className="text-xl">
              $
              {`${
                data.market_data.current_price.usd < 1
                  ? data.market_data.current_price.usd.toFixed(12)
                  : data.market_data.current_price.usd
              }`}
            </div>
            <div
              className={`${
                data.market_data.price_change_percentage_24h <= 0.0
                  ? "text-red-400 text-lg"
                  : "text-green-400 text-lg"
              }`}>
              {data.market_data.price_change_percentage_24h.toFixed(2)}% (1d)
            </div>
          </div>
          <div className="flex text-center items-center justify-center gap-12">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="md:mx-56"></div>
                    <div className="flex justify-center items-center gap-16 md:gap-20 my-3">
                      <div className="flex gap-3 justify-center items-center">
                        <div>Low</div>
                        <div className="text-red-400">
                          $
                          {`${
                            data.market_data.low_24h.usd < 1
                              ? data.market_data.low_24h.usd.toFixed(12)
                              : data.market_data.low_24h.usd.toLocaleString()
                          }`}
                        </div>
                      </div>
                      <div className="text-sm">24H Range</div>
                      <div className="text-green-400 flex gap-3 justify-center items-center">
                        <div>
                          $
                          {`${
                            data.market_data.high_24h.usd < 1
                              ? data.market_data.high_24h.usd.toFixed(12)
                              : data.market_data.high_24h.usd.toLocaleString()
                          }`}
                        </div>
                        <div className="text-gray-400 text-sm">High</div>
                      </div>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>
          <div className="md:flex block text-left gap-4">
            <div className="md:w-1/2 flex">
              {" "}
              {/*LEFT*/}
              <Table>
                <TableHeader>
                  <TableRow></TableRow>
                  <TableRow>
                    <TableHead className="text-left flex items-center gap-2">
                      <div>Market Cap</div>
                      <div className="pt-[0.3rem]">
                        <Hovers
                          header={"Market Cap = Price x Circulating Supply"}
                          body={`Total market value of all ${data.name} currently in circulation.`}
                        />
                      </div>
                    </TableHead>
                    <TableHead className="text-right text-MyPurple">
                      ${data.market_data.market_cap.usd.toLocaleString()}
                    </TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-left flex items-center gap-2">
                      <div>Volume (24h)</div>
                      <div className="pt-[0.3rem]">
                        <Hovers
                          header={`A measure of the amount of ${data.name} traded across all tracked platforms in the last 24 hours.`}
                          body={""}
                        />
                      </div>
                    </TableHead>
                    <TableHead className="text-right text-MyPurple">
                      ${data.market_data.total_volume.usd.toLocaleString()}
                    </TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-left flex items-center gap-2">
                      <div>Fully Diluted Valuation</div>
                      <div>
                        <div className="pt-[0.3rem]">
                          <Hovers
                            header={`FDV is the theoretical market capitalization ${data.name} of the entire outstanding supply, based on current market prices.`}
                            body={
                              "Fully Diluted Valuation (FDV) = Price x Total Supply"
                            }
                          />
                        </div>
                      </div>
                    </TableHead>
                    <TableHead className="text-right text-MyPurple">
                      $
                      {data.market_data.fully_diluted_valuation.usd.toLocaleString()}
                    </TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
            <div className="md:w-1/2 flex">
              {" "}
              {/*RIGHT*/}
              <Table>
                <TableHeader>
                  <TableRow></TableRow>
                  <TableRow>
                    <TableHead className="text-left flex items-center gap-2">
                      <div>Circulating Supply</div>
                      <div>
                        <div className="pt-[0.3rem]">
                          <Hovers
                            header={`Number of ${data.name} outstanding in the market and tradable by the public.`}
                            body={""}
                          />
                        </div>
                      </div>
                    </TableHead>
                    <TableHead className="text-right text-MyPurple">
                      {Math.floor(
                        data.market_data.circulating_supply
                      ).toLocaleString()}{" "}
                      {data.symbol.toUpperCase()}
                    </TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-left flex items-center gap-2">
                      <div>Total Supply</div>
                      <div>
                        <div className="pt-[0.3rem]">
                          <Hovers
                            header={`Number of coins that have been made, minus coins that have been burned (taken out of circulation).`}
                            body={
                              "Total supply = Total coins made - coins burned"
                            }
                          />
                        </div>
                      </div>
                    </TableHead>
                    <TableHead className="text-right text-MyPurple">
                      {Math.floor(
                        data.market_data.total_supply
                      ).toLocaleString()}{" "}
                      {data.symbol.toUpperCase()}
                    </TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-left flex items-center gap-2">
                      <div>Max Supply</div>
                      <div>
                        <div className="pt-[0.3rem]">
                          <Hovers
                            header={`Maximum number of ${data.name} assigned/patented`}
                            body={""}
                          />
                        </div>
                      </div>
                    </TableHead>
                    <TableHead className="text-right text-MyPurple">
                      {data.market_data.max_supply === null
                        ? "-"
                        : `${data.market_data.max_supply.toLocaleString()}`}{" "}
                      {data.symbol.toUpperCase()}
                    </TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
          </div>
          <div className="my-1">
            <div className="text-xl font-bold my-2">{data.name} Historical</div>
            <div className="md:mx-52 mx-0">
              <Table>
                <TableHeader>
                  <TableRow></TableRow>
                  <TableRow>
                    <TableHead className="text-left">All Time High</TableHead>
                    <TableHead>{formattedAthDate}</TableHead>
                    <TableHead className="text-right">
                      <div className="font-bold">
                        ${data.market_data.ath.usd.toLocaleString()}
                      </div>
                      <div
                        className={
                          data.market_data.ath_change_percentage.usd < 0
                            ? "text-red-400"
                            : "text-green-400"
                        }>
                        {data.market_data.ath_change_percentage.usd.toFixed(2)}%
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">All Time Low</TableHead>
                    <TableHead>{formattedAtlDate}</TableHead>
                    <TableHead className="text-right">
                      <div className="font-bold">
                        ${data.market_data.atl.usd.toLocaleString()}
                      </div>
                      <div
                        className={
                          data.market_data.atl_change_percentage.usd < 0
                            ? "text-red-400"
                            : "text-green-400"
                        }>
                        {data.market_data.atl_change_percentage.usd.toFixed(2)}%
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
          </div>
          <div className="mt-2">
            <div className="my-1">
              <div className="flex justify-center gap-2">
                <Link
                  href={data.links.homepage[0]}
                  className={
                    data.links.homepage[0] === "" || null
                      ? "hidden"
                      : data.links.homepage[0]
                  }
                  target="_blank">
                  <Button
                    variant={"purple"}
                    size={"sm"}
                    className="flex items-center gap-1 rounded-lg">
                    <BsGlobe2 />
                    <div>Website</div>
                  </Button>
                </Link>

                <Link
                  href={
                    data.links.subreddit_url === null || ""
                      ? "hidden"
                      : data.links.subreddit_url
                  }
                  className={
                    data.links.subreddit_url === null || ""
                      ? "hidden"
                      : data.links.subreddit_url
                  }
                  target="_blank">
                  <Button
                    variant={"purple"}
                    size={"sm"}
                    className="flex items-center gap-1 rounded-lg">
                    <FaReddit />
                    <div>Reddit</div>
                  </Button>
                </Link>

                <Link
                  href={`https://twitter.com/${data.links.twitter_screen_name}`}
                  className={
                    data.links.twitter_screen_name === null || ""
                      ? "hidden"
                      : data.links.twitter_screen_name
                  }
                  target="_blank">
                  <Button
                    variant={"purple"}
                    size={"sm"}
                    className="flex items-center gap-1 rounded-lg">
                    <FaXTwitter />
                    <div>Twitter</div>
                  </Button>
                </Link>

                <Link
                  href={`${
                    data.links.repos_url.github[0] === null
                      ? "NULL"
                      : data.links.repos_url.github[0]
                  }`}
                  className={`${
                    data.links.repos_url.github[0] === null || ""
                      ? "hidden"
                      : data.links.repos_url.github[0]
                  }`}
                  target="_blank">
                  <Button
                    variant={"purple"}
                    size={"sm"}
                    className="flex items-center gap-1 rounded-lg">
                    <FaGithub />
                    <div>Github</div>
                  </Button>
                </Link>
              </div>

              <div className="flex justify-center items-center text-center gap-5">
                <div>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-sm transition-all duration-300 bg-MyPurple hover:bg-MyPurple/60 my-2">
                          Explorer
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="p-3">
                          {Array.isArray(data.links.blockchain_site) ? (
                            <ul className="grid gap-2">
                              {data.links.blockchain_site
                                .filter((url: string) => url !== "")
                                .map((url: string, index: number) => {
                                  const domainName = new URL(url).hostname;
                                  return (
                                    <li
                                      className="row-span-1"
                                      key={index}>
                                      <Link
                                        href={url}
                                        target="_blank"
                                        className="underline">
                                        <div className="text-sm flex items-center gap-1 hover:bg-MyPurple/50 p-1 rounded">
                                          <div>{domainName}</div>
                                          <MdOutlineOpenInNew />
                                        </div>
                                      </Link>
                                    </li>
                                  );
                                })}
                            </ul>
                          ) : null}
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
                <div>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-sm transition-all duration-300 bg-MyPurple hover:bg-MyPurple/60 my-2">
                          Categories
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="p-3">
                          {Array.isArray(data.categories) ? (
                            <ul className="grid gap-2">
                              {data.categories.map(
                                (category: string, index: number) => {
                                  return (
                                    <li
                                      className="row-span-1"
                                      key={index}>
                                      <div>
                                        <div className="bg-MyPurple/50 rounded-md p-1">
                                          <div>{category}</div>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          ) : null}
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="font-bold text-2xl my-3">{data.name} Markets</div>
            <div className="mb-10">
              <Table>
                <ScrollArea className="h-[35rem] w-full rounded-md border-2">
                  <TableHeader className="z-10 sticky top-0 bg-MyPurple">
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead className="text-left font-bold text-lg">
                        Exchange
                      </TableHead>
                      <TableHead>Pair</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>24h Volume</TableHead>
                      <TableHead className="text-center">Trust Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  {data.tickers.map((ticker, index) => (
                    <TableBody
                      key={index}
                      className="-z-10">
                      <TableRow>
                        <TableHead>{index + 1}</TableHead>
                        <TableHead className="font-bold text-lg">
                          {ticker.market.name}
                        </TableHead>
                        <TableHead
                          className={
                            ticker.base.length >= 15 ? "hidden" : ticker.base
                          }>
                          {ticker.base}/{ticker.target}
                        </TableHead>
                        <TableHead>${ticker.last.toLocaleString()}</TableHead>
                        <TableHead>
                          ${ticker.converted_volume.usd.toLocaleString()}
                        </TableHead>
                        <TableHead
                          className={
                            ticker.trust_score === "green"
                              ? "text-green-400 flex text-center items-center justify-center"
                              : "text-red-400 flex text-center items-center justify-center"
                          }>
                          <FaCircle />
                        </TableHead>
                      </TableRow>
                      <TableRow></TableRow>
                    </TableBody>
                  ))}
                </ScrollArea>
              </Table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
