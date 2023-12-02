"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

//LOGOs
import { FaReddit, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

interface PageProps {
  params: {
    id: string;
  };
}

interface PageData {
  name: string;
  year_established: number;
  url: string;
  image: string;
  centralized: any;
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
    market: {
      name: string;
      identifier: string;
    };
    trust_score: string;
  }[];
}

const Page: React.FC<PageProps> = ({ params: { id } }) => {
  const [data, setData] = useState<PageData | null>(null);

  useEffect(() => {
    async function getData() {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/exchanges/${id}`;

      try {
        const response = await axios.get<PageData>(url);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, [id]);

  return (
    <>
      {data && (
        <>
          <div className="text-center items-center mt-10">
            <div className="flex justify-center">
              <Button variant={"purple"}>{data.trust_score_rank}</Button>
            </div>
            <div className="my-5">
              <div className="flex justify-center gap-2">
                <Image
                  src={data.image}
                  width={64}
                  height={64}
                  alt={data.name + "Image"}
                  priority
                />
                <div className="my-5 text-xl font-bold">{data.name}</div>
              </div>
            </div>
            <div>{data.year_established}</div>
            <Button
              variant={"purple"}
              className="my-2">
              <Link
                href={data.url}
                target="_blank">
                Trade
              </Link>
            </Button>
            <div className="my-3">
              <Button
                variant={"purple"}
                size={"lg"}
                className="w-24">
                <Link
                  href={data.reddit_url}
                  target="_blank">
                  <FaReddit />
                </Link>
              </Button>
              <Button
                variant={"purple"}
                size={"lg"}
                className="w-24 mx-5">
                <Link
                  href={data.facebook_url}
                  target="_blank">
                  <FaFacebook />
                </Link>
              </Button>
              <Button
                variant={"purple"}
                size={"lg"}
                className="w-24">
                <Link
                  href={`https://twitter.com/${data.twitter_handle}`}
                  target="_blank">
                  <FaSquareXTwitter />
                </Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
