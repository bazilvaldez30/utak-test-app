import { menuItems } from '@/lib/datas'
import React from 'react'
import MenusCard from './menus-card'

export default function Menus() {
  return (
    <div className='lg:max-w-6xl space-y-6'>
      <div>
        <h1 className='text-4xl font-semibold dark:text-white text-custom-12'>
          Menu
        </h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {menuItems.map((item) => (
          <MenusCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  )
}
