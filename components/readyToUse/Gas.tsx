import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useEffect, useState } from 'react';

const GasPriceComponent = () => {

  const [gasPrices, setGasPrices] = useState({
    safeGasPrice: '',
    proposeGasPrice: '',
    fastGasPrice: '',
  });

  const fetchGasPrices = async () => {
    try {
      const response = await fetch('https://api.etherscan.io/api?module=gastracker&action=gasoracle');
      const data = await response.json();

      if (data.status === '1') {
        const { SafeGasPrice, ProposeGasPrice, FastGasPrice } = data.result;
        setGasPrices({
          safeGasPrice: SafeGasPrice,
          proposeGasPrice: ProposeGasPrice,
          fastGasPrice: FastGasPrice,
        });
      } else {
        console.error('Failed to fetch gas prices:', data.message);
      }
    } catch (error) {
      console.error('Error fetching gas prices:', error);
    }
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

  const HoverText = "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"

  return (

    <NavigationMenu className='list-none z-10'>
      <NavigationMenuItem className="">
        <NavigationMenuTrigger className="text-base">
          <div className='flex gap-1'>
            <p className='text-gray-400'>Gas: </p>
            <p> Average: {gasPrices.proposeGasPrice}</p>
          </div>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="z-10">
          <ul className="">
            <li className="">
              <NavigationMenuLink asChild className="">
              <div className="gap-5 flex p-5">
                <p className="bg-opacity-100">Low: {gasPrices.safeGasPrice}</p>
                <p>Average: {gasPrices.proposeGasPrice}</p>
                <p>High: {gasPrices.fastGasPrice}</p>
              </div>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem> 
    </NavigationMenu>
  );
}

export default GasPriceComponent;

