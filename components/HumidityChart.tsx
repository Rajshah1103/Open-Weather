"use client"

import { FC } from 'react'
import { Card,AreaChart,Title } from '@tremor/react'

interface HumidityChartProps {
    results: Root
}

const HumidityChart:FC<HumidityChartProps> = ({results})=> {

    const hourly = results?.hourly.time.map((time)=> new Date(time).toLocaleString("en-US",{
        hour: "numeric",
        hour12:false,
    })
    ).slice(0,24);

    const data = hourly.map((hour,i)=>({
        time:Number(hour),
        "Humidity (%)": results.hourly.relativehumidity_2m[i]
    }))

    const dataFormatter = (number:number) => `${number} %`;


 return(
     
     <Card>
        <Title>Humidity Levels</Title>
        <AreaChart
            className='mt-6'
            data={data}
            showLegend
            index="time"
            categories={["Humidity (%)"]}
            colors={['green']}
            minValue={0}
            maxValue={100}
            valueFormatter={dataFormatter}
            yAxisWidth={40}
            
        />
    </Card>

 ) 
}

export default HumidityChart