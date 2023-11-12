import TrendingCoinsApps from "@/components/readyToUse/tabletrending"
import TrendingNFTApps from "@/components/readyToUse/tablenft"
import TrendingCateforyApps from "@/components/readyToUse/tablecategory"

const TrendingApp = () => {
    return (
        <div className="text-center my-5">
            <div className="font-bold text-xl">Top-7 trending Coins as Searched by Users in the last 24 hours</div>
            <TrendingCoinsApps></TrendingCoinsApps>
            <div className="font-bold text-xl">Top Crypto Categories By Market Cap</div>
            <TrendingCateforyApps></TrendingCateforyApps>
            <div className="font-bold text-xl">Top-5 trending NFTs based on the highest Trading Volume in the last 24 hours</div>
            <TrendingNFTApps></TrendingNFTApps>
        </div>
    )
}
export default TrendingApp