"use client"
import { FC } from 'react'
import { CheckCircleIcon,ExclamationIcon } from '@heroicons/react/solid';
import { Callout } from '@tremor/react';

interface CalloutCardProps {
    message:string;
    warning?:boolean
}

const CalloutCard:FC<CalloutCardProps> = ({
    message,warning
})=> {

 return(

    <Callout 
        className='mt-4'
        title={message}
        icon={warning ? ExclamationIcon : CheckCircleIcon}
        color={warning ? "rose" : "teal"}
    />

 ) 
 
}

export default CalloutCard