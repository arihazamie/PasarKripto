"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
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
//LOGOs
import { FaReddit, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter, FaLink, FaCircle } from "react-icons/fa6";

interface PageProps {
  params: {
    id: string;
  };
}

interface Bitcoin {
  market_data: {
    current_price: {
      usd: number;
    };
  };
}

interface PageData {
  name: string;
  year_established: number;
  url: string;
  image: string;
  centralized: boolean;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;

  //SOCIAL
  facebook_url: string;
  reddit_url: string;
  other_url_1: string;
  twitter_handle: string;

  //TICkers
  tickers: {
    base: string;
    target: string;
    volume: number;
    last: number; //LastPrice
    converted_volume: {
      usd: number;
    };
    market: {
      name: string;
      identifier: string;
    };
    trust_score: string;
  }[];
}

const Page: React.FC<PageProps> = ({ params: { id } }) => {
  const [data, setData] = useState<PageData | null>(null);
  const [dataBtc, setDataBtc] = useState<Bitcoin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/exchanges/${id}`;

      try {
        const response = await axios.get<PageData>(url);
        setData(response.data);
      } catch (error) {}
    }

    getData();
  }, [id]);

  useEffect(() => {
    async function getBtc() {
      const url = "https://api.coingecko.com/api/v3/coins/bitcoin";

      try {
        const response = await axios.get<Bitcoin>(url);
        setDataBtc(response.data);
      } catch (error) {}
    }

    getBtc();
  }, [id]);

  const Volume24H = Math.floor(
    (data?.trade_volume_24h_btc || 0) *
      (dataBtc?.market_data.current_price.usd || 0)
  ).toLocaleString();
  const VolumeBTC = Math.floor(
    data?.trade_volume_24h_btc || 0
  ).toLocaleString();

  const Twitter = `https://x.com/${data?.twitter_handle}`;
  const Loading = "flex justify-center items-center text-center";

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <div>
      {isLoading ? (
        <div className="mx-5">
          <div className={Loading}>
            <Skeleton className="w-44 h-7 my-5" />
          </div>
          <div className={Loading}>
            <Skeleton className="w-36 h-16" />
          </div>
          <div className={Loading}>
            <Skeleton className="w-20 h-20 my-5 rounded-full mx-5" />
            <Skeleton className="w-48 h-20 my-5" />
          </div>
          <div className={Loading}>
            <Skeleton className="w-80 h-24" />
          </div>
          <div className="flex justify-center items-center text-center gap-5 my-5">
            <Skeleton className="w-24 h-10" />
            <Skeleton className="w-24 h-10" />
            <Skeleton className="w-24 h-10" />
            <Skeleton className="w-24 h-10" />
          </div>
          <div className={Loading}>
            <Skeleton className="w-full h-80" />
          </div>
        </div>
      ) : (
        <>
          {data && (
            <>
              <div className="text-center my-5">
                <Link
                  href={"/exchanges"}
                  className="hover:underline hover:underline-offset-2 hover:text-MyPurple">
                  Exchanges
                </Link>
                {" > "} <span className="text-slate-400">{data.name}</span>
              </div>
              <div className="text-center item-center mt-5">
                <div className="flex justify-center">
                  <div className="bg-MyPurple/70 py-1 px-2 rounded shadow-2xl">
                    Rank : {data.trust_score_rank}
                    <div>Trust Score : {data.trust_score}</div>
                  </div>
                </div>
                <div className="my-5">
                  <div className="flex justify-center text-center items-center gap-5">
                    <Image
                      src={data.image}
                      width={64}
                      height={64}
                      alt={data.name + "Image"}
                      priority
                      className="rounded-full"
                    />
                    <div>
                      <div className="text-4xl font-bold">{data.name}</div>
                      <div>
                        {data.centralized ? "Centralized" : "Decentralized"}{" "}
                        Exchange
                      </div>
                    </div>
                    <div className="text-lg">{data.year_established}</div>
                  </div>
                </div>
                <div className="border p-2 md:mx-[30rem] mx-14 rounded-md bg-MyPurple/70 shadow-2xl">
                  <div>Trading Volume(24H)</div>
                  <div className="text-3xl font-bold my-2">
                    ${Volume24H.toLocaleString()}
                  </div>
                  <div>{VolumeBTC.toLocaleString()} BTC</div>
                </div>
                <div className="my-5 flex justify-center items-center text-center md:gap-5 gap-1">
                  <Link
                    href={data.url}
                    className={data.url == "" ? "hidden" : data.url}
                    target="_blank">
                    <Button
                      className="gap-1"
                      size={"sm"}
                      variant={"purple"}>
                      {data.name}
                      <FaLink />
                    </Button>
                  </Link>
                  <Link
                    href={Twitter}
                    target="_blank"
                    className={
                      data.twitter_handle == "" ? "hidden" : data.twitter_handle
                    }>
                    <Button
                      className="gap-1"
                      variant={"purple"}
                      size={"sm"}>
                      Twitter
                      <FaSquareXTwitter />
                    </Button>
                  </Link>
                  <Link
                    href={data.reddit_url}
                    target="_blank"
                    className={
                      data.reddit_url == "" ? "hidden" : data.reddit_url
                    }>
                    <Button
                      className="gap-1"
                      variant={"purple"}
                      size={"sm"}>
                      Reddit
                      <FaReddit />
                    </Button>
                  </Link>
                  <Link
                    href={data.facebook_url}
                    target="_blank"
                    className={
                      data.facebook_url == "" ? "hidden" : data.facebook_url
                    }>
                    <Button
                      className="gap-1"
                      variant={"purple"}
                      size={"sm"}>
                      Facebook <FaFacebook />
                    </Button>
                  </Link>
                </div>
                <div className="mx-5 mb-5">
                  <Table>
                    <ScrollArea className="h-[35rem] w-full rounded-md border-2">
                      <TableHeader className="z-10 sticky top-0 bg-MyPurple rounded-md">
                        <TableRow>
                          <TableHead>#</TableHead>
                          <TableHead className="text-lg">Exchange</TableHead>
                          <TableHead>Pair</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>24h Volume</TableHead>
                          <TableHead className="text-center">
                            Trust Score
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      {data.tickers.map((ticker, index) => (
                        <TableBody
                          key={index}
                          className="-z-10 bg-MyPurple/10">
                          <TableRow>
                            <TableHead>{index + 1}</TableHead>
                            <TableHead className="font-bold">
                              {ticker.market.name}
                            </TableHead>
                            <TableHead>
                              {ticker.base}/{ticker.target}
                            </TableHead>
                            <TableHead>
                              ${ticker.last.toLocaleString()}
                            </TableHead>
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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
