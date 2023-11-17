import TrendingCategoryApps from "@/components/readyToUse/Categories/TrendingCategories";
import Link from "next/link";

const TrendingApp = () => {

  return (
    <div className="text-center my-5">
      <div className="font-bold text-xl mb-5">
        <Link href={"/trending"}>Coins</Link>
        <Link href={"/trending/nfts"} className="mx-4">NFTs</Link>
        <Link href={"/trending/categories"} className="underline underline-offset-1">Categories</Link>
      </div>

      <TrendingCategoryApps />
    </div>
  );
};

export default TrendingApp;
