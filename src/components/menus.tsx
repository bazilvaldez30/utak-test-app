'use client'

import React from 'react'
import { useQuery } from 'react-query'
import MenusCard from './menus-card'
import MenuForm from './menu-form'
import { getData } from '@/lib/firebase/firebase'
import { Menu } from 'lucide-react'

export default function Menus() {
  const { data, isLoading, isError, error } = useQuery<Menu[], Error>({
    queryKey: ['menus'],
    queryFn: getData,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching menu items</div>

  return (
    <div className='lg:max-w-6xl space-y-6 p-6 md:p-0'>
      <div>
        <h1 className='text-5xl font-semibold text-custom-gradient'>Menu</h1>
        <p className='text-custom-11'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
          corrupti.
        </p>
      </div>
      <div className='flex sticky top-[90px] z-10 py-5 dark:bg-custom-12 bg-white items-center justify-center duration-1000'>
        <h1 className='text-4xl font-semibold dark:text-white text-custom-12 duration-1000'>
          Menu
        </h1>
        <MenuForm />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-1 xl:min-w-[1100px] lg:min-w-[1000px] '>
        {data?.map((item) => (
          <MenusCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  )
}
