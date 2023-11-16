'use client'
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="text-left">
      <div className="py-10 text-center text-2xl">Dominance percentage as compared to other cryptocurrencies in the top ranking.</div>
      <Table className="text-center">
        <TableCaption className="my-5">A list of Dominance.</TableCaption>
        <TableHeader>
          <TableRow />
          <TableRow>
            <TableHead className="text-center">No</TableHead>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-center">Percentages %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-auto">
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell className="text-left text-lg font-bold">Bitcoin Dominance</TableCell>
            <TableCell className={dom.btc.toFixed(2) < dom.btc.toFixed(2) ? "text-red-400" : "text-green-400"}>{dom.btc ? dom.btc.toFixed(2) : 'N/A'} %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell className="text-left text-base font-bold">Ethereum Dominance</TableCell>
            <TableCell className={dom.eth.toFixed(2) < dom.eth.toFixed(2) ? "text-red-400" : "text-green-400"}>{dom.eth ? dom.eth.toFixed(2) : 'N/A'} %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell className="text-left text-base font-bold">USDT Dominance</TableCell>
            <TableCell className={dom.usdt.toFixed(2) < dom.usdt.toFixed(2) ? "text-red-400" : "text-green-400"}>{dom.usdt ? dom.usdt.toFixed(2) : 'N/A'} %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>4</TableCell>
            <TableCell className="text-left text-base font-bold">BNB Dominance</TableCell>
            <TableCell className={dom.bnb.toFixed(2) < dom.bnb.toFixed(2) ? "text-red-400" : "text-green-400"}>{dom.bnb ? dom.bnb.toFixed(2) : 'N/A'} %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>5</TableCell>
            <TableCell className="text-left text-base font-bold">XRP Dominance</TableCell>
            <TableCell className={dom.xrp.toFixed(2) < dom.xrp.toFixed(2) ? "text-red-400" : "text-green-400"}>{dom.xrp ? dom.xrp.toFixed(2) : 'N/A'} %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>6</TableCell>
            <TableCell className="text-left text-base font-bold">SOL Dominance</TableCell>
            <TableCell className={dom.sol.toFixed(2) < dom.sol.toFixed(2) ? "text-red-400" : "text-green-400"}>{dom.sol ? dom.sol.toFixed(2) : 'N/A'} %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>7</TableCell>
            <TableCell className="text-left text-base font-bold">USDC Dominance</TableCell>
            <TableCell className={dom.usdc.toFixed(2) < dom.usdc.toFixed(2) ? "text-red-400" : "text-green-400"}>{dom.usdc ? dom.usdc.toFixed(2) : 'N/A'} %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>8</TableCell>
            <TableCell className="text-left text-base font-bold">STETH Dominance</TableCell>
            <TableCell className={dom.steth.toFixed(2) < dom.steth.toFixed(2) ? "text-red-400" : "text-green-400"}>{dom.steth ? dom.steth.toFixed(2) : 'N/A'} %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>9</TableCell>
            <TableCell className="text-left text-base font-bold">ADA Dominance</TableCell>
            <TableCell className={dom.ada.toFixed(2) < dom.ada.toFixed(2) ? "text-red-400" : "text-green-400"}>{dom.ada ? dom.ada.toFixed(2) : 'N/A'} %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>10</TableCell>
            <TableCell className="text-left text-base font-bold">DOGE Dominance</TableCell>
            <TableCell className={dom.doge.toFixed(2) < dom.doge.toFixed(2) ? "text-red-400" : "text-green-400"}>{dom.doge ? dom.doge.toFixed(2) : 'N/A'} %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DominanceApp;
