import React, { useState, useMemo } from 'react'
import { useQuery } from 'react-query'
import MenusCard from './menus-card'
import MenuForm from './menu-form'
import MenuFilter from './menu-filter'
import { Option } from './ui/multi-selector'
import { getData } from '@/lib/firebase/firebase'

export default function Menus() {
  const [filter, setFilter] = useState<string[]>([])
  const { data, isLoading, isError, error } = useQuery<Menu[], Error>(
    ['menus', filter],
    getData
  )

  // Filter data using useMemo
  const filteredData = useMemo(() => {
    if (!data) return []
    if (filter.length === 0) return data
    return data.filter((item) => filter.includes(item.category))
  }, [data, filter])

  const handleSelect = (selectedOptions: Option[]) => {
    const values = selectedOptions.map((item) => item.value.toString())
    setFilter(values)
  }

  return (
    <div className='lg:max-w-6xl space-y-6 p-6 md:p-0'>
      <div>
        <h1 className='text-5xl font-semibold text-custom-gradient'>Menu</h1>
        <p className='text-custom-11'>
          Welcome to our restaurant! Explore our delicious menu items below.
        </p>
      </div>
      <div className='flex md:flex-row flex-col top-[90px] z-10 py-5 items-center justify-center'>
        <div className='w-full order-1 md:order-none px-6 md:px-0'>
          {/* Memoize the MenuFilter component to prevent unnecessary re-renders */}
          <MenuFilter handleSelect={handleSelect} />
        </div>
        <div className='md:w-4/12 mb-5 md:mb-0'>
          <MenuForm />
        </div>
      </div>
      <div className='grid grid-cols-1 px-8 md:grid-cols-2 lg:grid-cols-4 gap-6 md:px-1 xl:min-w-[1100px] lg:min-w-[1000px] '>
        {/* Render MenusCard components with filteredData */}
        {filteredData.map((item) => (
          <MenusCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  )
}
