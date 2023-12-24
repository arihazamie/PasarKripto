"use client";
// Import necessary dependencies and components
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCaption,
  TableCell,
} from "@/components/ui/table";

// Define the Rate interface
export interface Rate {
  rates: {
    [key: string]: {
      name: string;
      unit: string;
      value: number;
      type: string;
    };
  };
}

// Define the Rates component
const Rates = () => {
  const [rateData, setRateData] = useState<Rate | null>(null);

  const url = `https://api.coingecko.com/api/v3/exchange_rates`;

  useEffect(() => {
    async function fetchCoinData() {
      try {
        const response = await axios.get<Rate>(url);

        if (response.data.rates) {
          setRateData(response.data);
        } else {
        }
      } catch (error) {}
    }

    fetchCoinData();
  }, [url]);

  return (
    <div>
      <div className="mx-5 mb-10">
        <div>
          <div className="my-5 text-center text-2xl">
            Exchange Rates Converted to Bitcoin
          </div>
          <div>
            <Table>
              <TableCaption className="my-5">
                All list of exchange rates
              </TableCaption>
              <ScrollArea className="w-full border-2 rounded-lg md:h-[28rem] h-[35rem]">
                <TableHeader className="sticky top-[-0.2rem] text-lg bg-MyPurple">
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                {rateData &&
                  Object.entries(rateData.rates).map(([key, data]) => (
                    <TableBody
                      key={key}
                      className="bg-MyPurple/10">
                      <TableRow>
                        <TableCell className="md:text-lg text-sm">
                          {data.type.toLocaleUpperCase()}
                        </TableCell>
                        <TableCell className="md:text-lg md:font-bold text-sm">
                          {data.name}
                        </TableCell>
                        <TableCell>
                          {data.value.toLocaleString()}
                          <span className="md:font-bold text-sm">
                            {data.unit}
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
              </ScrollArea>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rates;
