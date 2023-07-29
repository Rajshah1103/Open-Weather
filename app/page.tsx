import Image from 'next/image'
import { Hero } from '@/components'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: "Open Weather App",
  description: "A new generation weather app which uses ChatGPT to summarize the weather data and gives the description regarding the weather"
} 

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#394F68] to-[#183B7E] p-10 flex flex-col justify-center items-center">
      <Hero/>
    </div>
  )
}
