"use client"

import { FC } from 'react'
import { Card,Color,Metric,Text } from '@tremor/react'

interface StatCardProps {
    title:string;
    metric:string | number;
    color?:Color

}

const StatCard:FC<StatCardProps> = ({
    title,metric,color
})=> {
 return(
        <Card decoration='top' decorationColor={color}>
            <Text>{title}</Text>
            <Metric>{metric}</Metric>
        </Card>     
    ) 
    
}

export default StatCard