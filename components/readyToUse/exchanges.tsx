'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import balancer from "@/public/Image/balancer-v2-avalanche.jpg"
import { Skeleton } from '../ui/skeleton';
import { ScrollArea } from '../ui/scroll-area';

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
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const response = await axios.get<Exchange>(`${process.env.NEXT_PUBLIC_API_BASE_URL}coins/bitcoin`);
        setBitcoinData(response.data);
      } catch (error) {
        console.error('Error fetching Bitcoin data:', error);
      }
    };

    fetchBitcoinData();
  }, []);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/exchanges?per_page=100&page=${currentPage}`;

    setIsLoading(true)

    axios.get(apiUrl)
      .then(response => {
        setExchangeData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false once the data is fetched (whether success or error)
      });
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className='mx-5 text-center items-center justify-center mb-10'>
        <Skeleton className='flex h-10 mx-[33rem] my-5 items-center text-center justify-center' />
        <div className='w-full h-[32rem] rounded-md border-2 bg-slate-200'>
            <Skeleton className='h-12 w-full my-3' />
            <Skeleton className='h-12 w-full my-3' />
            <Skeleton className='h-12 w-full my-3' />
            <Skeleton className='h-12 w-full my-3' />
            <Skeleton className='h-12 w-full my-3' />
            <Skeleton className='h-12 w-full my-3' />
            <Skeleton className='h-12 w-full my-3' />
            <Skeleton className='h-12 w-full my-3' />
        </div>
      </div>
    );
  }

  const handleNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage >= 2) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  return (
    <div className='mx-5'>
      <div className='text-2xl font-bold text-center my-5'>Exchanges</div>
      <Table className="w-full h-auto bg-MyPurple/5">
        <ScrollArea className='w-full h-[32rem] rounded-md border-2'>
          <TableHeader className='sticky top-0 bg-MyPurple text-white'>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className='text-center'>Trust Score</TableHead>
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
        </ScrollArea>
      </Table>
      <div className="items-center justify-center text-center mt-5">
        <div>
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
          <span>Page {currentPage}</span>
          <Button onClick={handleNextPage} disabled={currentPage === 7}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default ExchangesApp;
