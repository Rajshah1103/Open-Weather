"use client"

import { FC, useState } from 'react'
import { Country,City } from 'country-state-city'
import Select from 'react-select'
import { useRouter } from 'next/navigation';
import {GlobeIcon} from "@heroicons/react/solid"

interface CityPickerProps {}

type option = {
    value: {
        latitude:string,
        longitude:string,
        isoCode:string,
    };
    label:string;
} | null;

type CityOption = {
    value: {
        latitude:string,
        longitude:string,
        countryCode:string,
        name:string,
        stateCode:string,
    };
    label:string;
} | null;

const options = Country.getAllCountries().map((country)=>({
    value: {
        latitude:country.latitude,
        longitude:country.longitude,
        isoCode:country.isoCode,
    },
    label:country.name,
}));


const CityPicker:FC<CityPickerProps> = ({})=> {

    const [selectedCountry,setSelectedCountry] = useState<option>(null)
    const [selectedCity,setSelectedCity] = useState<CityOption>(null);
    const router = useRouter();

    const handleSelectCountry = (option:option) =>{
        setSelectedCountry(option);
        setSelectedCity(null);
    };

    const handleSelectCity = (option:CityOption) =>{
        setSelectedCity(option)
        router.push(`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`)
    }

 return(

     <div className='space-y-4'>
        <div className='space-y-2'>
        <div className='flex items-center gap-2 text-white/80'>
            <GlobeIcon className='h-5 w-5 text-white'/>
            <label htmlFor="country">Country</label>
        </div>
        <Select
        value={selectedCountry}
        onChange={handleSelectCountry} 
        options={options}
        className='text-black'
        />
        </div>

        {selectedCountry && (
              <div className='space-y-2'>
              <div className='flex items-center gap-2 text-white/80'>
                  <GlobeIcon className='h-5 w-5 text-white'/>
                  <label htmlFor="city">City</label>
              </div>
              <Select
              value={selectedCity}
              onChange={handleSelectCity} 
              options={
                City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map(state=>({
                    value:{
                        latitude:state.latitude!,
                        longitude:state.latitude!,
                        countryCode:state.countryCode,
                        name:state.name,
                        stateCode:state.stateCode,
                    },
                    label:state.name
                }))
              }
              className='text-black'
              />
              </div>
        )}     
     </div>

 ) 
}

export default CityPicker