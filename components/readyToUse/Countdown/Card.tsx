import React from 'react'

const Page = () => {

    return (
        <div className='md:flex block text-sm md:mx-28 gap-10 mt-10 mx-9'>
            <div className='border-2 rounded-xl p-4 md:w-[40rem] w-80'>
                <div className="text-MyPurple font-bold text-2xl">First Halving</div>
                <div className="my-2 font-bold">November 28 2012</div>
                <div>On the day of the halving the price of Bitcoin was approximately $12. Six months later around May 28 2013 the price had risen significantly to about $130 showcasing a substantial increase.</div>
            </div>
            <div className='border-2 rounded-xl p-4 md:w-[40rem] w-80 md:my-0 my-5'>
                <div className="text-MyPurple font-bold text-2xl">Second Halving</div>
                <div className="my-2 font-bold">July 9 2016</div>
                <div>The price of Bitcoin was around $660 on the day of the halving. Around January 9 2017 the price increased to about $900 indicating a considerable growth in value over six months.</div>
            </div>
            <div className='border-2 rounded-xl p-4 md:w-[40rem] w-80'>
                <div className="text-MyPurple font-bold text-2xl">Third Halving</div>
                <div className="my-2 font-bold">May 11 2020</div>
                <div>Bitcoin price was approximately 8600 on the day of the halving and it rose to over $15700 six months later around November 11 2020.</div>
            </div>
        </div>
    )
}

export default Page