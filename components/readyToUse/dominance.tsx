"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GlobalData {
  data: {
    market_cap_percentage: {
      [key: string]: number;
    };
  };
}

const DominanceApp = () => {
  const [data, setData] = useState<GlobalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const urlApi = `${process.env.NEXT_PUBLIC_API_BASE_URL}/global`;
    const fetchData = async () => {
      try {
        const response = await axios.get<GlobalData>(urlApi);
        setData([response.data]);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const mapData = (data: GlobalData) => {
    const { market_cap_percentage } = data.data;
    const entries = Object.entries(market_cap_percentage);

    return entries.map(([coinName, percentage], index) => ({
      index: index + 1, // Add index for display
      name: coinName,
      percentage,
    }));
  };

  return (
    <div>
      {isLoading ? (
        <div className="md:mx-60 mx-5">
          <Skeleton className="w-full h-10 my-5" />
          <div className="md:mx-44 mx-5">
            <Skeleton className="w-full h-[40rem]" />
          </div>
        </div>
      ) : (
        <div>
          <div className="py-5 text-center text-xl">
            Dominance percentage as compared to other cryptocurrencies in the
            top ranking.
          </div>
          <div className="md:mx-[27rem] mx-5 mb-5">
            <div className="text-left">
              <Table className="text-center bg-MyPurple/5 border-2 rounded-lg">
                <TableHeader className="bg-MyPurple/70">
                  <TableRow />
                  <TableRow className="font-bold">
                    <TableHead className="text-center">#</TableHead>
                    <TableHead className="text-left">Name</TableHead>
                    <TableHead className="text-center">Percentages %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.length > 0 &&
                    mapData(data[0]).map((item) => (
                      <TableRow key={item.name}>
                        <TableCell className="text-center">
                          {item.index}
                        </TableCell>
                        <TableCell className="text-left font-bold">
                          {item.name.toLocaleUpperCase()}
                        </TableCell>
                        <TableCell className="text-center text-MyPurple font-bold">
                          {item.percentage.toFixed(2)} %
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DominanceApp;
