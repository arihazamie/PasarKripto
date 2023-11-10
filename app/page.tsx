
const Home = async () => {

    const globals = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/global`)
    const globalsData = await globals.json()

    const totalExchanges = globalsData.data.markets
    const totalCryptocurrencies = globalsData.data.active_cryptocurrencies

  return (
    <div className="mt-[10rem] fixed ">
      <div className="text-center mx-16">
        <span className="font-bold underline">{totalCryptocurrencies}</span> Cryptocurrencies registered 
        & 
        <span className="font-bold underline"> {totalExchanges}</span> Exchange active
      </div>
      <div className="mt-[5rem]">
        <p className="text-3xl md:text-4xl md:mx-72 text-center"><span className="font-bold">PasarKripto</span> <br />makes it easy to track your favorite coins  </p>
      </div>
    </div>
  )
}

export default Home