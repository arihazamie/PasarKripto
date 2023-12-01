'use client'
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
    TableCell,
} from "@/components/ui/table";

// Define the Rate interface
export interface Rate {
    rates: {
        btc?: {
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
    const [sortedData, setSortedData] = useState<Rate["rates"] | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const url = `https://api.coingecko.com/api/v3/exchange_rates`;

    useEffect(() => {
        async function fetchCoinData() {
            try {
                const response = await axios.get<Rate>(url);

                if (response.data.rates) {
                    setRateData(response.data);
                    setSortedData(response.data.rates);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchCoinData();
    }, [url]);


    return (
        <>
            {rateData && (
                <div className="mx-5 mb-10">
                    <div>
                        <div className="my-5 text-center text-2xl">
                            Exchange Rates Converted to Bitcoin
                        </div>
                        <Table>
                            <ScrollArea className="w-full border-2 rounded-lg h-[28rem]">
                                <TableHeader className="sticky top-[-0.2rem] text-lg bg-MyPurple">
                                    <TableRow />
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Value</TableHead>
                                    </TableRow>
                                </TableHeader>
                                {sortedData &&
                                    Object.entries(sortedData).map(([index, data]) => (
                                        <TableBody key={index} className="bg-MyPurple/5">
                                            <TableRow>
                                                <TableCell>{data.type.toLocaleUpperCase()}</TableCell>
                                                <TableCell>{data.name}</TableCell>
                                                <TableCell>
                                                    {data.value.toLocaleString()} {data.unit}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow />
                                        </TableBody>
                                    ))}
                            </ScrollArea>
                        </Table>
                    </div>
                </div>
            )}
        </>
    );
};

export default Rates;
