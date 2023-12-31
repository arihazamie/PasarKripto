import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";

const GasPriceComponent = () => {
  const [gasPrices, setGasPrices] = useState({
    safeGasPrice: "",
    proposeGasPrice: "",
    fastGasPrice: "",
  });

  const fetchGasPrices = async () => {
    try {
      const response = await fetch(
        "https://api.etherscan.io/api?module=gastracker&action=gasoracle"
      );
      const data = await response.json();

      if (data.status === "1") {
        const { SafeGasPrice, ProposeGasPrice, FastGasPrice } = data.result;
        setGasPrices({
          safeGasPrice: SafeGasPrice,
          proposeGasPrice: ProposeGasPrice,
          fastGasPrice: FastGasPrice,
        });
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    // Fetch initial data
    fetchGasPrices();

    // Fetch data every 15 seconds
    const intervalId = setInterval(() => {
      fetchGasPrices();
    }, 15000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <NavigationMenu className="list-none z-10 text-sms">
      <NavigationMenuItem>
        <NavigationMenuTrigger className="text-base">
          <div className="flex gap-1 hover:text-[#7071E8]">
            <p className="text-gray-400">Gas: </p>
            <p> Average: {gasPrices.proposeGasPrice}</p>
          </div>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="z-10 shadow">
          <div>
            <NavigationMenuLink asChild>
              <div className="gap-5 flex p-3">
                <p className="bg-opacity-100">Low: {gasPrices.safeGasPrice}</p>
                <p>Average: {gasPrices.proposeGasPrice}</p>
                <p>High: {gasPrices.fastGasPrice}</p>
              </div>
            </NavigationMenuLink>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
};

export default GasPriceComponent;
