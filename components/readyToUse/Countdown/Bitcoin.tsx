"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AccordionCountdown from "./AccordionCountdown";
import Card from "./Card";
import { Skeleton } from "@/components/ui/skeleton";

interface CountdownProps {
  targetDate: string;
}

interface Blocks {
  data: {
    blocks: number;
  };
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    Halving: 840000,
  });

  const [data, setData] = useState<Blocks>({ data: { blocks: 0 } });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function calculateTimeLeft() {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      const Halving = 840000;

      return {
        days,
        hours,
        minutes,
        seconds,
        Halving,
      };
    }

    const initialTimeLeft = calculateTimeLeft();
    setTimeLeft(initialTimeLeft);

    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      setTimeLeft(timeLeft);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [targetDate]);

  useEffect(() => {
    async function fetchCoinData() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_BLOCK}/bitcoin/stats`;
        const response = await axios.get<Blocks>(url);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    }

    fetchCoinData();
  }, []);

  const { days, hours, minutes, seconds, Halving } = timeLeft;
  const { blocks } = data.data;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  });

  const TextDesign = "text-xl text-MyPurple md:text-2xl font-bold";

  return (
    <div>
      {isLoading ? (
        <div className="mx-10">
          <div className="mx-56">
            <Skeleton className="w-full h-16 my-5" />
          </div>
          <div className="flex gap-5 items-center text-center justify-center">
            <Skeleton className="w-28 h-28" />
            <Skeleton className="w-28 h-28" />
            <Skeleton className="w-28 h-28" />
            <Skeleton className="w-28 h-28" />
          </div>
          <div className="grid justify-center gap-y-2 my-5">
            <Skeleton className="w-64 h-7" />
            <Skeleton className="w-72 h-7 -ml-3" />
            <Skeleton className="w-64 h-7" />
          </div>
          <div className="mx-16 flex gap-10">
            <Skeleton className="w-80 h-72" />
            <Skeleton className="w-80 h-72" />
            <Skeleton className="w-80 h-72" />
          </div>
        </div>
      ) : (
        <div className="text-center my-5 md:text-5xl text-2xl">
          <div className="font-bold text-MyPurple">
            Bitcoin Halving Countdown
          </div>
          <div className="flex md:gap-5 gap-2 text-center justify-center items-center font-bold my-5">
            <div className="border-2 p-3 rounded-xl cursor-default">
              {days}
              <div className={TextDesign}>Days</div>
            </div>
            <div className="border-2 p-3 rounded-xl cursor-default">
              {hours}
              <div className={TextDesign}>Hours</div>
            </div>
            <div className="border-2 p-3 rounded-xl cursor-default">
              {minutes}
              <div className={TextDesign}>Minutes</div>
            </div>
            <div className="border-2 p-3 rounded-xl cursor-default">
              {seconds}
              <div className={TextDesign}>Seconds</div>
            </div>
          </div>
          <div className="text-xl my-10">
            <div>
              Current Block at{" "}
              <span className="underline">{blocks.toLocaleString()}</span>
            </div>
            <div>
              Bitcoin Halving at Block{" "}
              <span className="underline">{Halving.toLocaleString()}</span>
            </div>
            <div>
              <span className="underline">
                {Math.abs(blocks - 840000).toLocaleString()}
              </span>{" "}
              Blocks to go...
            </div>
          </div>
          <div className="my-10">
            <Card />
          </div>
          <div className="md:text-xl text-lg md:mx-60 my-10 mx-5">
            <AccordionCountdown />
          </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
