"use client"
import { blog_data } from '@/Assets/assets'
import React from 'react'
import HotelOne from './HotelOne'

const HotelList = () => {
  return (
    <div>
        <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24 '>
            {
                blog_data.map((item)=>{
                   return <HotelOne key={item.id} image={item.image} title={item.title} description={item.description} category={item.category} id={item.id}/>
                })
            }
        </div>
    </div>
  )
}

export default HotelList