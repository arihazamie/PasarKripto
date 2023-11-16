'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import balancer from "@/public/Image/balancer-v2-avalanche.jpg"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface Exchange {
  id: string;
  name: string;
  trust_score_rank: number;
  image: string;
  trust_score: number;
  year_established: number;
  trade_volume_24h_btc: number;
  market_data: {
    current_price: {
      usd: number;
    };
  };
}

const ExchangesApp = () => {

  const [currentPage, setCurrentPage] = useState(1);

  const [exchangeData, setExchangeData] = useState<Exchange[]>([]);
  const [bitcoinData, setBitcoinData] = useState<Exchange | null>(null);


  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const response = await axios.get<Exchange>('https://api.coingecko.com/api/v3/coins/bitcoin');
        setBitcoinData(response.data);
      } catch (error) {
        console.error('Error fetching Bitcoin data:', error);
      }
    };

    fetchBitcoinData();
  }, []);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/exchanges?per_page=100&page=${currentPage}`;

    axios.get(apiUrl)
      .then(response => {
        setExchangeData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage >= 2) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  return (
    <>
      <Table className="w-full h-auto">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className='text-center'>Trust Score</TableHead>
            <TableHead className='text-center'>Year Established</TableHead>
            <TableHead>Volume 24h</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exchangeData.map(exchange => (
            <TableRow key={exchange.id}>
              <TableCell>{exchange.trust_score_rank}</TableCell>
              <Link href={`/exchanges/${exchange.id}`} className="flex text-left" prefetch>
                <Image
                  src={exchange.image === "missing_small.png" ? balancer : exchange.image}
                  width={50}
                  height={50}
                  alt={exchange.name}
                />
                <TableCell className='font-bold text-base'>{exchange.name}</TableCell>
              </Link>
              <TableCell className='text-center'>
                {exchange.trust_score ?? "null"}
              </TableCell>
              <TableCell className='text-center'>
                {exchange.year_established ?? "null"}
              </TableCell>
              <TableCell className='text-green-500'>
                {(
                  exchange.trade_volume_24h_btc *
                  (bitcoinData ? bitcoinData.market_data.current_price.usd : 1)
                ).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="items-center justify-center text-center">
        <div>
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
          <span>Page {currentPage}</span>
          <Button onClick={handleNextPage} disabled={currentPage === 7}>Next</Button>
        </div>
      </div>
    </>
  );
};

export default ExchangesApp;
