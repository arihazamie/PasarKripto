"use client";
import { useEffect, useState } from "react";
import TrendingCoins from "./TrendingCoins";
import TrendingCategories from "./TrendingCategories";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <div>
      {isLoading ? (
        <div className="mx-5">
          <div className="md:flex grid gap-5">
            <div className="md:w-1/2 w-full">
              <Skeleton className="w-full h-[30rem]" />
            </div>
            <div className="md:w-1/2 w-full">
              <Skeleton className="w-full h-[30rem]" />
            </div>
          </div>
        </div>
      ) : (
        <div className="md:flex block gap-5 border-2 p-5 rounded-lg">
          <div className="md:w-1/2 w-full border-2 rounded-lg bg-MyPurple/5 my-2">
            <TrendingCoins />
          </div>
          <div className="md:w-1/2 w-full border-2 rounded-lg bg-MyPurple/5 my-2">
            <TrendingCategories />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
