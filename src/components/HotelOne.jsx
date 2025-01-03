import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HotelOne = ({title,description,category,image,id}) => {
  return (
    <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black'>
      <Image src={image} alt="" width={400} height={400} className='border-b border-black'/>
      <p className='ml-2 mt-4 mb-2 px-1 bg-blue-100 text-gray-600 inline-block text-sm '>{category}</p>
      <h3 className='mb-2 text-center text-lg font-medium tracking-tight text-gray-900'>{title}</h3>
      <p className='mb-3 px-1 text-sm tracking-tight text-gray-600'>{description}</p>
      <div className='flex items-center justify-center mb-2'>
        <Link href={`/table/${id}`}><button className='px-3 py-1 bg-black text-white rounded'>Book A Table</button></Link>
      </div>

    </div>
  )
}

export default HotelOne
