"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Component {
  title: string;
  link: string;
  description: string;
}

interface PageProps {
  params: {
    id: number;
  };
}

const components: Component[] = [
  {
    title: "What is Cryptocurrency?",
    link: "what-is-cryptocurrency",
    description: "Learn About Cryptocurrency",
  },
  {
    title: "What is Blockchain?",
    link: "what-is-blockchain",
    description: "Learn About Blockchain",
  },
  {
    title: "What is Bitcoin?",
    link: "what-is-bitcoin",
    description: "Learn About Bitcoin",
  },
  {
    title: "Cryptocurrency work?",
    link: "how-does-cryptocurrency-work",
    description: "Learn About cryptocurrency work",
  },
  {
    title: "What is Altcoin?",
    link: "what-is-altcoin",
    description: "Learn About Altcoin",
  },
  {
    title: "What is DeFi?",
    link: "what-is-defi",
    description: "Learn About DeFi",
  },
  {
    title: "Ethereum Ecosystem?",
    link: "what-is-ethereum-ecosystem",
    description: "Learn About Ethereum Ecosystem",
  },
  {
    title: "What is Exchanges?",
    link: "what-is-exchanges",
    description: "Learn About Exchanges",
  },
  {
    title: "What is NFTs?",
    link: "what-is-nfts",
    description: "Learn About NFTs",
  },
];

const Page: React.FC<PageProps> = () => {
  const Footer = "PasarKripto Academy";

  return (
    <>
      <div className="text-3xl text-center my-5 font-bold">
        Learn with PasarKripto Academy
      </div>
      <div className="md:mx-32 mx-10 my-10">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
          {components.map((component, index) => (
            <div key={index}>
              <Card className="bg-MyPurple/10 shadow-2xl">
                <CardHeader>
                  <CardTitle>{component.title}</CardTitle>
                  <CardDescription>{component.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter className="text-sm">
                  <div className="text-slate-400">{Footer}</div>
                  <Link
                    href={`academy/${component.link}`}
                    className="font-bold bg-MyPurple/70 p-1 rounded hover:bg-MyPurple/50 ml-12 text-base px-5">
                    Learn
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
