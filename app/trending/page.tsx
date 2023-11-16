import TrendingCoinsApps from "@/components/readyToUse/Categories/TrendingCoins";
import Link from "next/link";

const TrendingApp = () => {

  return (
    <div className="text-center my-5">
        <div className="font-bold text-xl mb-5">
            <Link href={"/trending"} className="underline underline-offset-1">Coins</Link>
            <Link href={"/trending/nfts"} className="mx-5">NFTs</Link>
            <Link href={"/trending/categories"}>Categories</Link>
        </div>

        <TrendingCoinsApps/>
    </div>
  );
};

export default TrendingApp;
