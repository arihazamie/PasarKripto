"use client"
// NavbarAPI.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GasTracker from './Gas';
import Link from 'next/link';

type GlobalData = {
  active_cryptocurrencies: number;
  markets: number;
  market_cap_change_percentage_24h_usd: any;
  market_cap_percentage: any;
};

const NavbarAPI: React.FC = () => {
  const [data, setData] = useState<GlobalData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/global`);
        const { active_cryptocurrencies, markets, market_cap_change_percentage_24h_usd, market_cap_percentage } = response.data.data;
        setData({ active_cryptocurrencies, markets, market_cap_change_percentage_24h_usd, market_cap_percentage });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const dom = data?.market_cap_percentage


  return (
    <div className='w-full -z-20 border-b-2'>
      {data && (
        <div className={'flex gap-20 text-center items-center justify-center shadow-sm mx-10'}>
          <p><span className='text-gray-400'>Cryptos:</span> {data.active_cryptocurrencies}</p>
          <p><span className='text-gray-400'>Exchanges:</span> {data.markets}</p> 
          <p><span className='text-gray-400'>MarketCap:</span> <span className={data.market_cap_change_percentage_24h_usd < 0 ? 'text-red-500' : 'text-green-500'}>{data.market_cap_change_percentage_24h_usd.toFixed(2)}%</span></p>
          <Link href={"/dominance"}><p><span className='text-gray-400'>Dominance:</span> BTC: {dom.btc.toFixed(1)}%</p> </Link>
          <GasTracker/> 
        </div>
      )}
    </div>
  );
};

export default NavbarAPI;
