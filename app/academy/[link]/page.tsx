"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Component {
  title: string;
  link: string;
  description: string;
  content: string;
  body: string;
}

interface PageProps {
  params: {
    link: string;
  };
}

const components: Component[] = [
  {
    title: "What is Cryptocurrency?",
    link: "what-is-cryptocurrency",
    description: "Learn About Cryptocurrency",
    content:
      "Cryptocurrency is a digital form of currency secured by cryptography and operates on decentralized networks using blockchain technology. Unlike traditional fiat currencies, cryptocurrencies are not controlled by any central authority, relying on a distributed network to validate and record transactions. Bitcoin is the first and most well-known cryptocurrency, and thousands of others, known as altcoins, have been created since. Cryptocurrencies enable peer-to-peer transactions without intermediaries, using cryptographic techniques for security. They can also facilitate smart contracts on platforms like Ethereum. While offering exciting possibilities, cryptocurrencies pose challenges such as security concerns, regulatory issues, and potential misuse due to the pseudonymous nature of transactions.",
    body: "",
  },
  {
    title: "What is Blockchain?",
    link: "what-is-blockchain",
    description: "Learn About Blockchain",
    content:
      "Blockchain is a decentralized and secure digital ledger technology that records transactions across a network. It uses a chain of blocks, each containing a list of transactions secured through cryptography. Key features include decentralization, transparency, security, immutability, and the ability to execute smart contracts. Beyond cryptocurrencies, blockchain is applied in industries for enhanced security and efficiency in various processes.",
    body: "",
  },
  {
    title: "What is Bitcoin?",
    link: "what-is-bitcoin",
    description: "Learn About Bitcoin",
    content:
      "Bitcoin is a decentralized digital currency created in 2009 by an anonymous entity known as Satoshi Nakamoto. Operating on a peer-to-peer network, it enables users to conduct transactions without intermediaries. Bitcoin transactions are recorded on a public ledger called the blockchain, maintained through a process called mining, where complex mathematical problems are solved. The total supply of bitcoins is capped at 21 million, creating scarcity. Bitcoin's value is determined by market dynamics, and its pseudonymous nature ensures user privacy. While some see it as a store of value, others consider it an alternative to traditional currencies, leading to regulatory debates.",
    body: "",
  },
  {
    title: "Cryptocurrency work?",
    link: "how-does-cryptocurrency-work",
    description: "Learn About cryptocurrency work",
    content:
      "Cryptocurrency is a digital currency that operates on decentralized networks using blockchain technology. Blockchain is a secure and transparent ledger that records all transactions across a network of computers. Cryptocurrencies use cryptography for security and rely on consensus mechanisms like Proof of Work or Proof of Stake to validate transactions. Mining (in Proof of Work) involves solving complex mathematical problems to add new blocks to the blockchain. Users store their cryptocurrency in wallets, which hold public and private keys. Transactions are broadcast to the network, verified by miners or validators, and added to the blockchain. Cryptocurrencies often have a capped supply, and some support smart contracts, which are self-executing contracts with terms written in code. Overall, cryptocurrencies enable secure and decentralized digital transactions without the need for intermediaries.",
    body: "",
  },
  {
    title: "What is Altcoin?",
    link: "what-is-altcoin",
    description: "Learn About Altcoin",
    content:
      "Altcoin refers to any cryptocurrency other than Bitcoin. The term, short for alternative coins includes a diverse range of digital currencies developed as alternatives to Bitcoin. Altcoins vary in technology, purpose, and features, with examples such as Ethereum, Ripple, Litecoin, and Cardano. Investors often explore altcoins for potential innovations, but the cryptocurrency market is volatile, requiring thorough research before investment.",
    body: "",
  },
  {
    title: "What is DeFi?",
    link: "what-is-defi",
    description: "Learn About DeFi",
    content:
      "DeFi, or Decentralized Finance, is a financial system built on blockchain technology that operates without traditional intermediaries. It utilizes smart contracts on decentralized platforms, enabling various financial activities like lending, borrowing, and trading. Key elements include smart contracts, blockchain, decentralized exchanges (DEXs), lending protocols, stablecoins, and yield farming. DeFi aims to increase financial accessibility and reduce reliance on traditional banking, though it faces challenges such as security risks and regulatory uncertainties.",
    body: "",
  },
  {
    title: "Ethereum Ecosystem?",
    link: "what-is-ethereum-ecosystem",
    description: "Learn About Ethereum Ecosystem",
    content:
      "The Ethereum ecosystem is a decentralized platform that operates on a blockchain, using the cryptocurrency Ether (ETH). It introduced the concept of smart contracts, self-executing agreements coded into the blockchain. Developers create decentralized applications (DApps) on Ethereum, spanning various industries like finance (DeFi) and art (NFTs). Ethereum Improvement Proposals (EIPs) guide platform enhancements, and Ethereum 2.0 is a major upgrade transitioning from proof-of-work to proof-of-stake for improved scalability and sustainability. Overall, Ethereum has been a pioneering force in blockchain technology, enabling innovative applications and decentralized solutions.",
    body: "",
  },
  {
    title: "What is Exchanges?",
    link: "what-is-exchanges",
    description: "Learn About Exchanges",
    content:
      "A cryptocurrency exchange is a platform where users can buy, sell, and trade cryptocurrencies. There are two main types of cryptocurrency exchanges: centralized and decentralized. Centralized exchanges are owned and operated by a central entity, while decentralized exchanges are not owned or operated by a central entity. When choosing a cryptocurrency exchange, it is important to consider a number of factors, such as liquidity, security, features, and fees.",
    body: "",
  },
  {
    title: "What is NFTs?",
    link: "what-is-nfts",
    description: "Learn About NFTs",
    content:
      "NFTs, or Non-Fungible Tokens, are unique digital assets stored on a blockchain that represent ownership and authenticity of specific items or content. Unlike interchangeable cryptocurrencies, each NFT has a distinct value and cannot be exchanged on a one-to-one basis. NFTs are commonly used for digital art, music, videos, and other digital creations. Their ownership and transaction history are securely recorded on the blockchain, providing transparency and proof of ownership. The popularity of NFTs has transformed the way digital content is bought, sold, and owned, offering new opportunities for artists and creators in various industries.",
    body: "",
  },
];

const Page: React.FC<PageProps> = ({ params: { link } }) => {
  const component = components.find((comp) => comp.link === link);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (!component) {
    return (
      <div className="text-center text-5xl font-bold">
        <h1>Pages Not Found</h1>
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <div className="mx-52">
          <div className="mx-72">
            <Skeleton className="w-full h-5 my-5" />
          </div>
          <div className="mx-64">
            <Skeleton className="w-full h-10 my-5" />
          </div>
          <Skeleton className="w-full h-[20rem]" />
        </div>
      ) : (
        <div className="text-center justify-center items-center sm:mx-2">
          <div className="mt-3">
            <Link
              href={"/academy"}
              className="hover:text-MyPurple hover:underline">
              academy
            </Link>{" "}
            {"> "}
            <span className="text-slate-500">{component.title}</span>
          </div>
          <div className="font-bold text-3xl my-5 text-MyPurple">
            PasarKripto Academy
          </div>
          <div className="border-2 rounded-md bg-MyPurple/10 my-3 md:mx-52 mx-5 p-5">
            <div className="text-2xl font-bold mb-2">{component.title}</div>
            <div className="text-justify text-slate-300">
              {component.content}
            </div>
            <div className="mt-3">
              <Link
                href={"/academy"}
                className="bg-MyPurple/70 p-2 rounded-md hover:bg-MyPurple/50">
                Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
