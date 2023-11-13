import TrendingCoinsApps from "@/components/readyToUse/tabletrending";
import Link from "next/link";

const TrendingApp = () => {

  return (
    <div className="text-center my-5">
        <div className="font-bold text-xl mb-5">
            <Link href={"/"}>Coins</Link>
            <Link href={"/"} className="mx-4">NFTs</Link>
            <Link href={"/"}>Categories</Link>
        </div>

        <TrendingCoinsApps/>
    </div>
  );
};

export default TrendingApp;
