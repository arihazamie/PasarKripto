'use client'
import { useState, useEffect } from "react"
import axios from "axios"

interface PageProps {
  params: {
    id: string
  }
}

interface PageData {
  name: string
  year_established: number
  url: string
  image: string
  centralized: any
  trust_score: number
  trust_score_rank: number
  trade_volume_24h_btc: number
}

const Page: React.FC<PageProps> = ({ params: { id } }) => {

  const [data, setData] = useState<PageData | null>(null)

  useEffect(() => {
    async function getData() {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/exchanges/${id}`

      try {
        const response = await axios.get<PageData>(url)
        setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    getData()
  }, [setData])


  return (
    <>
      {data && (
        <div>
          <div>{data.name}</div>
          <div>{}</div>
        </div>
      )}
    </>
  )
}

export default Page
