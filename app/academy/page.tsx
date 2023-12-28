"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image, { StaticImageData } from "next/image";

import Altcoin from "../Images/Altcoin.webp";
import Blockchain from "../Images/BlockChain.webp";
import Cryptocurrency from "../Images/CryptoCurrency.webp";
import Btc from "../Images/Btc.webp";
import Work from "../Images/Work.webp";
import Eth from "../Images/EthEcosystem.webp";
import Defi from "../Images/Defi.webp";
import Exchanges from "../Images/Exchanges.webp";
import NFT from "../Images/NFT.webp";

interface Component {
  title: string;
  link: string;
  description: string;
  image: StaticImageData;
}

interface PageProps {
  params: {
    id: number;
  };
}

const components: Component[] = [
  {
    title: "What is Cryptocurrency?",
    link: "what-is-cryptocurrency",
    description: "Learn About Cryptocurrency",
    image: Cryptocurrency,
  },
  {
    title: "What is Blockchain?",
    link: "what-is-blockchain",
    description: "Learn About Blockchain",
    image: Blockchain,
  },
  {
    title: "What is Bitcoin?",
    link: "what-is-bitcoin",
    description: "Learn About Bitcoin",
    image: Btc,
  },
  {
    title: "Cryptocurrency work?",
    link: "how-does-cryptocurrency-work",
    description: "Learn About cryptocurrency work",
    image: Work,
  },
  {
    title: "What is Altcoin?",
    link: "what-is-altcoin",
    description: "Learn About Altcoin",
    image: Altcoin,
  },
  {
    title: "What is DeFi?",
    link: "what-is-defi",
    description: "Learn About DeFi",
    image: Defi,
  },
  {
    title: "Ethereum Ecosystem?",
    link: "what-is-ethereum-ecosystem",
    description: "Learn About Ethereum Ecosystem",
    image: Eth,
  },
  {
    title: "What is Exchanges?",
    link: "what-is-exchanges",
    description: "Learn About Exchanges",
    image: Exchanges,
  },
  {
    title: "What is NFTs?",
    link: "what-is-nfts",
    description: "Learn About NFTs",
    image: NFT,
  },
];

const Page: React.FC<PageProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const Footer = "PasarKripto Academy";

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="md:mx-32 mx-10">
          <div>
            <Skeleton className="w-full h-10 my-5" />
          </div>
          <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-10">
            <Skeleton className="w-[19rem] h-44" />
            <Skeleton className="w-[19rem] h-44" />
            <Skeleton className="w-[19rem] h-44" />
            <Skeleton className="w-[19rem] h-44" />
            <Skeleton className="w-[19rem] h-44" />
            <Skeleton className="w-[19rem] h-44" />
            <Skeleton className="w-[19rem] h-44" />
            <Skeleton className="w-[19rem] h-44" />
            <Skeleton className="w-[19rem] h-44" />
          </div>
        </div>
      ) : (
        <div>
          <div className="text-3xl text-center my-5 font-bold">
            Learn with PasarKripto Academy
          </div>
          <div className="md:mx-32 mx-10 my-10">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
              {components.map((component, index) => (
                <div key={index}>
                  <Card className="bg-MyPurple/10 shadow-2xl">
                    <CardHeader>
                      <CardTitle>{component.title}</CardTitle>
                      <CardDescription>{component.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={component.image}
                        alt={component.title}
                        width={256}
                        height={256}
                        priority={true}
                        className="w-64 h-28 rounded-md shadow-xl"
                      />
                    </CardContent>
                    <CardFooter className="text-sm">
                      <div className="text-slate-400">{Footer}</div>
                      <Link
                        href={`academy/${component.link}`}
                        className="font-bold bg-MyPurple/70 p-1 rounded hover:bg-MyPurple/50 ml-12 text-base px-5">
                        Learn
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
