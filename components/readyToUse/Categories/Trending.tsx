import TrendingCoins from "./TrendingCoins"
import TrendingCategories from "./TrendingCategories"

const Page = () => {
    return (
        <div className="md:flex block gap-5 border-2 p-5 rounded-lg">
            <div className="md:w-1/2 w-full border-2 rounded-lg bg-MyPurple/5 my-2">
                <TrendingCoins />
            </div>
            <div className="md:w-1/2 w-full border-2 rounded-lg bg-MyPurple/5 my-2">
                <TrendingCategories />
            </div>
        </div>
    )
}

export default Page