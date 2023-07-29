"use client"

import { FC } from 'react'
import { Card,Text,Subtitle,Divider } from '@tremor/react'
import CityPicker from './CityPicker'

interface HomeProps {
}

const Hero:FC<HomeProps> = ({})=> {
 return(
       <>
              <Card className='max-w-3xl m-auto'>
                  <Text className='text-6xl font-bold text-center mb-10'>
                      Open Weather
                  </Text>
                  <Subtitle className='text-xl text-center'>
                      Powered by Open AI's ChatGPT
                  </Subtitle>
                  <Divider color='inverted'/>
                  <Card className='bg-gradient-to-br from-[#394F68] to-[#183B7E]'>
                     <CityPicker/>
                  </Card> 
              </Card>  
       </>
        
 )
}

export default Hero