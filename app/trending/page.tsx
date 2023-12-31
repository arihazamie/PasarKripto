import TrendingNFTApps from "@/components/readyToUse/Categories/TrendingNFT";
import Trending from "@/components/readyToUse/Categories/Trending";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const TrendingApp = () => {
  return (
    <>
      <Tabs defaultValue="1">
        <TabsList className="flex text-center items-center justify-center md:mx-[32rem] mx-32 text-xl my-5">
          <TabsTrigger value="1">Coins</TabsTrigger>
          <TabsTrigger value="2">Nfts</TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <Trending />
        </TabsContent>
        <TabsContent value="2">
          <TrendingNFTApps />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default TrendingApp;
