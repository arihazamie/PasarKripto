import TrendingNFTApps from "@/components/readyToUse/Categories/TrendingNFT";
import Link from "next/link";

const TrendingAppNFTS = () => {

  return (
    <div className="text-center my-5">
        <div className="font-bold text-xl mb-5">
            <Link href={"/trending"} className="">Coins</Link>
            <Link href={"/trending/nfts"} className="mx-4 underline underline-offset-1">NFTs</Link>
            <Link href={"/trending/categories"}>Categories</Link>
        </div>

        <TrendingNFTApps/>
    </div>
  );
};

export default TrendingAppNFTS;
