'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Hovers from "@/components/readyToUse/HoverAlert/ranking";
import ExplorerApp from "@/components/readyToUse/Cryptocurrencies/id/Explorer";


import { BsGlobe2 } from "react-icons/bs"
import { FaReddit, FaGithub } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6";


import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";

interface PageProps {
  params: {
    id: string;
  };
}

interface PageData {
  name: string
  symbol: string
  image: {
    large: string
  }
  market_cap_rank: number
  market_data: {
    current_price: {
      usd: number
    }
    ath: number
    ath_change_percentage: number
    ath_date: string
    atl: number
    atl_change_percentage: number
    atl_date: string
    market_cap: {
      usd: number
    }
    total_volume: {
      usd: number
    }
    high_24h: {
      usd: number
    }
    low_24h: {
      usd: number
    }
    total_supply: number
    max_supply: number
    circulating_supply: number
    price_change_percentage_24h: number
    fully_diluted_valuation: {
      usd: number
    }
  }
  tickers: {
    base: string
    target: string
    market: {
      name: string
    }
    last: number
    converted_volume: number
  }
  links: {
    twitter_screen_name: string
    subreddit_url: string
    homepage: string
    blockchain_site: string
    repos_url: {
      github: string
    }
  }

}

const Page: React.FC<PageProps> = ({ params: { id } }) => {

  const [data, setData] = useState<PageData | null>(null);

  useEffect(() => {
    async function getData() {
      const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${id}?localization=true&tickers=true&market_data=true`;

      try {
        const response = await axios.get<PageData>(url);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, [setData]);

  return (
    <>
      <div className="text-center items-center justify-center flex mt-5 md:mt-10 gap-2">
        <Link href={"/cryptocurrencies"} className="hover:underline-offset-4 hover:underline hover:text-MyPurple">Cryptocurrencies</Link>
        <div>{' > '}</div>
        <div className="text-gray-400">{id}</div>
      </div>
      {data && (
        <div className="text-center items-center justify-center mt-5 md:mt-10 md:mx-52">
          <div className="bg-MyPurple md:mx-96 mx-36 py-1 rounded shadow text-white">Rank : {data.market_cap_rank}</div>
          <div className="flex justify-center items-center gap-2 my-3">
            <Image src={data.image.large} width={50} height={50} alt={data.name} />
            <div className="text-2xl font-bold">{data.name}</div>
            <div className="text-gray-400">{data.symbol.toUpperCase()}</div>
            <div className="text-xl">
              ${`${data.market_data.current_price.usd < 1 ? data.market_data.current_price.usd.toFixed(12) : data.market_data.current_price.usd}`}
            </div>
            <div className={`${data.market_data.price_change_percentage_24h <= 0.0 ? "text-red-400 text-lg" : "text-green-400 text-lg"}`}>{data.market_data.price_change_percentage_24h.toFixed(2)}% (1d)</div>
          </div>
          <div className="flex text-center items-center justify-center gap-12">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="md:mx-56">
                    </div>
                    <div className="flex justify-center items-center gap-16 md:gap-20 my-3">
                      <div className="flex gap-3 justify-center items-center">
                        <div>Low</div>
                        <div className="text-red-400">${`${data.market_data.low_24h.usd < 1 ? data.market_data.low_24h.usd.toFixed(12) : data.market_data.low_24h.usd.toLocaleString()}`}</div>
                      </div>
                      <div className="text-sm">24H Range</div>
                      <div className="text-green-400 flex gap-3 justify-center items-center">
                        <div>${`${data.market_data.high_24h.usd < 1 ? data.market_data.high_24h.usd.toFixed(12) : data.market_data.high_24h.usd.toLocaleString()}`}</div>
                        <div className="text-gray-400 text-sm">High</div>
                      </div>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>
          <div className="md:flex block text-left gap-4">
            <div className="md:w-1/2 flex"> {/*LEFT*/}
              <Table>
                <TableHeader>
                  <TableRow></TableRow>
                  <TableRow>
                    <TableHead className="text-left flex items-center gap-2">
                      <div>Market Cap</div>
                      <div className="pt-[0.3rem]">
                        <Hovers header={"Market Cap = Harga x Supply Yang Beredar"} body={`Total nilai pasar semua ${data.name} yang saat ini beredar.`} />
                      </div>
                    </TableHead>
                    <TableHead className="text-right text-MyPurple">${data.market_data.market_cap.usd.toLocaleString()}</TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-left flex items-center gap-2">
                      <div>Volume (24h)</div>
                      <div className="pt-[0.3rem]">
                        <Hovers header={`Ukuran jumlah ${data.name} yang diperdagangkan di semua platform yang dilacak dalam 24 jam terakhir.`} body={""} />
                      </div>
                    </TableHead>
                    <TableHead className="text-right text-MyPurple">${data.market_data.total_volume.usd.toLocaleString()}</TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-left flex items-center gap-2">
                      <div>Fully Diluted Valuation</div>
                      <div>
                        <div className="pt-[0.3rem]">
                          <Hovers header={`FDV adalah kapitalisasi pasar teoretis ${data.name} dari seluruh pasok beredar, berdasarkan harga pasar saat ini.`} body={"Fully Diluted Valuation (FDV) = Harga x Total Supply"} />
                        </div>
                      </div>
                    </TableHead>
                    <TableHead className="text-right text-MyPurple">${data.market_data.fully_diluted_valuation.usd.toLocaleString()}</TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
            <div className="md:w-1/2 flex">
              <Table>
                <TableHeader>
                  <TableRow></TableRow>
                  <TableRow>
                    <TableHead className="text-left flex items-center gap-2">
                      <div>Circulating Supply</div>
                      <div>
                        <div className="pt-[0.3rem]">
                          <Hovers header={`Jumlah ${data.name} yang beredar di pasar dan dapat diperdagangkan oleh publik.`} body={""} />
                        </div>
                      </div>
                    </TableHead>
                    <TableHead className="text-right text-MyPurple">{Math.floor(data.market_data.circulating_supply).toLocaleString()} {data.symbol.toUpperCase()}</TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-left flex items-center gap-2">
                      <div>Total Supply</div>
                      <div>
                        <div className="pt-[0.3rem]">
                          <Hovers header={`Jumlah koin yang telah dibuat, dikurangi dengan koin yang telah dibakar (dikeluarkan dari peredaran).`} body={"Total pasokan = Total koin yang dibuat - koin yang telah dibakar"} />
                        </div>
                      </div>
                    </TableHead>
                    <TableHead className="text-right text-MyPurple">{Math.floor(data.market_data.total_supply).toLocaleString()} {data.symbol.toUpperCase()}</TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-left flex items-center gap-2">
                      <div>Max Supply</div>
                      <div>
                        <div className="pt-[0.3rem]">
                          <Hovers header={`Jumlah maksimum ${data.name} yang ditetapkan/dipatenkan`} body={""} />
                        </div>
                      </div>
                    </TableHead>
                    <TableHead className="text-right text-MyPurple">{data.market_data.max_supply === null ? "-" : `${data.market_data.max_supply.toLocaleString()}`} {data.symbol.toUpperCase()}</TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg">{data.name} Information</div>
            <div className="flex gap-16 items-center justify-center my-3">

              <Link href={data.links.homepage[0]} className={data.links.homepage[0] === "" || null ? "hidden" : data.links.homepage[0]} target="_blank">
                <Button variant={"purple"} size={"sm"} className="flex items-center gap-1 rounded-lg">
                  <BsGlobe2 />
                  <div>Website</div>
                </Button>
              </Link>

              <Link href={data.links.subreddit_url === null || "" ? "hidden" : data.links.subreddit_url} className={data.links.subreddit_url === null || "" ? "hidden" : data.links.subreddit_url} target="_blank">
                <Button variant={"purple"} size={"sm"} className="flex items-center gap-1 rounded-lg">
                  <FaReddit />
                  <div>Reddit</div>
                </Button>
              </Link>

              <Link href={`https://twitter.com/${data.links.twitter_screen_name}`} className={data.links.twitter_screen_name === null || "" ? "hidden" : data.links.twitter_screen_name} target="_blank">
                <Button variant={"purple"} size={"sm"} className="flex items-center gap-1 rounded-lg">
                  <FaXTwitter />
                  <div>Twitter</div>
                </Button>
              </Link>

              <Link href={`${data.links.repos_url.github[0] === null ? "NULL" : data.links.repos_url.github[0]}`} className={`${data.links.repos_url.github[0] === null || "" ? "hidden" : data.links.repos_url.github[0]}`} target="_blank">
                <Button variant={"purple"} size={"sm"} className="flex items-center gap-1 rounded-lg">
                  <FaGithub />
                  <div>Github</div>
                </Button>
              </Link>

              <div>
                <ExplorerApp />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;