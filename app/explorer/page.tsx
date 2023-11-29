import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Separator } from "@/components/ui/separator"


const page = () => {

    const thanks = [
        {
            name: "Blockchair",
            url: "https://blockchair.com/"
        },
        {
            name: "CoinGecko",
            url: "https://www.coingecko.com/"
        },
        {
            name: "PolygonScan",
            url: "https://polygonscan.com/"
        },
        {
            name: "TZStats",
            url: "https://tzstats.com/"
        },
        {
            name: "FTMScan",
            url: "https://ftmscan.com"
        },
        {
            name: "AptoScan",
            url: "https://aptoscan.com"
        },
        {
            name: "SOLSCAN",
            url: "https://solscan.io/"
        },
        {
            name: "FILSCAN",
            url: "https://filscan.io/"
        },
        {
            name: "ATOMSCAN",
            url: "https://atomscan.com/"
        },
        {
            name: "AVASCAN",
            url: "https://avascan.info/"
        },
        {
            name: "TRONSCAN",
            url: "https://tronscan.org/#/"
        },
    ]

    const data = [
        {
            id: "BTC",
            name: "Bitcoin",
            url: "https://blockchair.com/bitcoin",
            image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
        },
        {
            id: "LTC",
            name: "Litecoin",
            url: "https://blockchair.com/litecoin",
            image: "https://assets.coingecko.com/coins/images/2/large/litecoin.png?1696501400"
        },
        {
            id: "BSV",
            name: "Bitcoin SV",
            url: "https://blockchair.com/bitcoin-sv",
            image: "https://assets.coingecko.com/coins/images/6799/small/BSV.png?1696507128"
        },
        {
            id: "DASH",
            name: "Dash",
            url: "https://blockchair.com/dash",
            image: "https://assets.coingecko.com/coins/images/19/large/dash-logo.png?1696501423"
        },
        {
            id: "ZEC",
            name: "Zcash",
            url: "https://blockchair.com/zcash",
            image: "https://assets.coingecko.com/coins/images/486/large/circle-zcash-color.png?1696501740"
        },
        {
            id: "XEC",
            name: "Ecash",
            url: "https://blockchair.com/ecash",
            image: "https://assets.coingecko.com/coins/images/16646/large/Logo_final-22.png?1696516207"
        },
        {
            id: "ETH",
            name: "Ethereum",
            url: "https://blockchair.com/ethereum",
            image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628"
        },
        {
            id: "XRP",
            name: "Ripple",
            url: "https://blockchair.com/ripple",
            image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442"
        },
        {
            id: "XLM",
            name: "Stellar",
            url: "https://blockchair.com/stellar",
            image: "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1696501482"
        },
        {
            id: "XMR",
            name: "Monero",
            url: "https://blockchair.com/monero",
            image: "https://assets.coingecko.com/coins/images/69/large/monero_logo.png?1696501460"
        },
        {
            id: "ADA",
            name: "Cardano",
            url: "https://blockchair.com/cardano",
            image: "https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090"
        },
        {
            id: "SOL",
            name: "Solana",
            url: "https://solscan.io/",
            image: "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756"
        },
        {
            id: "BSC",
            name: "Binance",
            url: "https://blockchair.com/bnb",
            image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970"
        },
        {
            id: "DOT",
            name: "Polkadot",
            url: "https://blockchair.com/polkadot",
            image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png?1696512008"
        },
        {
            id: "KSM",
            name: "Kusama",
            url: "https://blockchair.com/kusama",
            image: "https://assets.coingecko.com/coins/images/9568/large/m4zRhP5e_400x400.jpg?1696509648s"
        },
        {
            id: "MATIC",
            name: "Polygon",
            url: "https://polygonscan.com/",
            image: "https://assets.coingecko.com/coins/images/4713/large/polygon.png?1698233745"
        },
        {
            id: "TRX",
            name: "Tron",
            url: "https://tronscan.org/",
            image: "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193"
        },
        {
            id: "AVAX",
            name: "Avalanche",
            url: "https://avascan.info/",
            image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512369"
        },
        {
            id: "ATOM",
            name: "Cosmos",
            url: "https://atomscan.com/",
            image: "https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png?1696502525"
        },
        {
            id: "FIL",
            name: "Filecoin",
            url: "https://filscan.io/",
            image: "https://assets.coingecko.com/coins/images/12817/large/filecoin.png?1696512609"
        },
        {
            id: "APT",
            name: "Aptos",
            url: "https://aptoscan.com/",
            image: "https://assets.coingecko.com/coins/images/26455/large/aptos_round.png?1696525528"
        },
        {
            id: "FTM",
            name: "Fantom",
            url: "https://ftmscan.com/",
            image: "https://assets.coingecko.com/coins/images/4001/large/Fantom_round.png?1696504642"
        },
        {
            id: "XTZ",
            name: "Tezos",
            url: "https://tzstats.com/",
            image: "https://assets.coingecko.com/coins/images/976/large/Tezos-logo.png?1696502091"
        },
    ]

    return (
        <>
            <div className='text-center my-10 text-2xl font-bold'>Crypto Network Explorer</div>
            <div className="grid mx-[15rem] gap-5 grid-cols-3 border-2 p-5 rounded-lg bg-MyPurple/5">
                {data.map((item) => (
                    <div key={item.id}>
                        <div className=''>
                            <Link href={item.url} className="mx-6 flex justify-center border-2 p-2 rounded-lg hover:border-MyPurple/80 gap-1" target='_blank'>
                                <Image src={item.image} width={32} height={32} alt={item.name}></Image>
                                <div className='text-lg font-bold'>{item.name}</div>
                                <div className='text-xs'>{item.id}</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <Separator className='my-10'/>
            <div className='text-center text-sm mb-10'>
                <div className='text-lg'>Thanks To</div>
                <div className='flex gap-2 text-center mx-[15rem]'>
                    {thanks.map((item) => (
                        <div key={item.name}>
                            <Link href={item.url} target='_blank' className='hover:underline'>{item.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default page