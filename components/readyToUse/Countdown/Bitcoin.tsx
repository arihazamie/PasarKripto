'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import AccordionCountdown from "./AccordionCountdown"
import Card from "./Card"

interface CountdownProps {
    targetDate: string
}

interface Blocks {
    data: {
        blocks: number
    }
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = new Date(targetDate).getTime() - new Date().getTime()
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        const Halving = 840000

        return { days, hours, minutes, seconds }
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft)
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    useEffect(() => {
        setTimeLeft(calculateTimeLeft)
    }, [])

    const [data, setData] = useState<Blocks>({ data: { blocks: 0 } })

    useEffect(() => {
        async function fetchCoinData() {
            try {
                const url = `${process.env.NEXT_PUBLIC_API_BLOCK}/bitcoin/stats`
                const response = await axios.get<Blocks>(url)
                setData(response.data)
            } catch (error) {
                console.error("Error fetching coin data:", error)
            }
        }

        fetchCoinData()
    }, [])

    const Halving = 840000

    return (
        <div className='text-center my-20 md:text-5xl text-2xl'>
            <div className='font-bold text-MyPurple'>Bitcoin Halving Countdown</div>
            <div className='flex md:gap-5 gap-2 text-center justify-center items-center text-MyPurple font-bold my-5'>
                <div className="border-2 rounded-xl p-3">
                    <div>{timeLeft.days}</div>
                    <div className='text-xl' >Days</div>
                </div>
                <div className="border-2 rounded-xl p-3">
                    <div>{timeLeft.hours}</div>
                    <div className='text-xl' >Hours</div>
                </div>
                <div className="border-2 rounded-xl p-3">
                    <div>{timeLeft.minutes}</div>
                    <div className='text-xl' >Minutes</div>
                </div>
                <div className="border-2 rounded-xl p-3">
                    <div>{timeLeft.seconds}</div>
                    <div className='text-xl' >Seconds</div>
                </div>
            </div>
            <div className='text-xl my-10'>
                <div>Current Block at <span className='underline'>{data.data.blocks.toLocaleString()}</span></div>
                <div>Bitcoin Halving at Block <span className='underline'>{Halving.toLocaleString()}</span></div>
                <div><span className='underline'>{Math.abs(data.data.blocks - 840000).toLocaleString()}</span> Blocks to go...</div>
            </div>
            <div className='my-10'>
                <Card />
            </div>
            <div className='md:text-xl text-lg md:mx-60 my-10 mx-5'>
                <AccordionCountdown />
            </div>
        </div>
    )
}

export default Countdown
