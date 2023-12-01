import TrendingNFTApps from "@/components/readyToUse/Categories/TrendingNFT"
import Trending from "@/components/readyToUse/Categories/Trending"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NextSeo } from 'next-seo';
const TrendingApp = () => {

  return (
    <>
      <Tabs defaultValue="1">
        <TabsList className="flex text-center items-center justify-center mx-[32rem] text-xl my-5">
          <TabsTrigger value="1">Coins</TabsTrigger>
          <TabsTrigger value="2">Nfts</TabsTrigger>
        </TabsList>
        <TabsContent value="1"><Trending /></TabsContent>
        <TabsContent value="2"><TrendingNFTApps /></TabsContent>
      </Tabs>
    </>
  );
};

export default TrendingApp;
