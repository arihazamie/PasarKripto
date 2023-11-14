'use client'
import { useState, useEffect } from "react";
import axios from "axios";

type GlobalData = {
  market_cap_percentage: any;
};

const DominanceApp = () => {
  const [data, setData] = useState<GlobalData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/global`);
        const { market_cap_percentage } = response.data.data;
        setData({ market_cap_percentage });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const dom = data?.market_cap_percentage;

  if (!dom) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-left text-xl">
        <div className="py-10 text-center text-2xl">Dominance percentage as compared to other cryptocurrencies in the top ranking.</div>
        <div className="ml-[35rem]">
            <div>Bitcoin: {dom.btc ? dom.btc.toFixed(1) : 'N/A'}%</div>
            <div className="py-5">Ethereum: {dom.btc ? dom.eth.toFixed(1) : 'N/A'}%</div>
            <div>Usdt: {dom.btc ? dom.usdt.toFixed(1) : 'N/A'}%</div>
            <div className="py-5">Binance Coin: {dom.btc ? dom.bnb.toFixed(1) : 'N/A'}%</div>
            <div>Xrp: {dom.btc ? dom.xrp.toFixed(1) : 'N/A'}%</div>
            <div className="py-5">Usdc: {dom.btc ? dom.usdc.toFixed(1) : 'N/A'}%</div>
            <div>Solana: {dom.btc ? dom.sol.toFixed(1) : 'N/A'}%</div>
            <div className="py-5">Lido Staked Ether: {dom.btc ? dom.steth.toFixed(1) : 'N/A'}%</div>
            <div>Cardano: {dom.btc ? dom.ada.toFixed(1) : 'N/A'}%</div>
            <div className="py-5">Dogecoin: {dom.btc ? dom.doge.toFixed(1) : 'N/A'}%</div>
        </div>
    </div>
  );
};

export default DominanceApp;
