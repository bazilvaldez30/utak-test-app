'use client'

import React, { useEffect, useState } from 'react'
import MultipleSelector, { Option } from '@/components/ui/multi-selector'
/* import { fetchAssetCategory } from '@/lib/helpers' */
import { categoriesOption } from '@/lib/datas'

interface InventoryFilterProps {
  handleSelect: (selectedOptions: Option[]) => void
}

export default function MenuFilter({
  handleSelect,
}: Readonly<InventoryFilterProps>) {
  return (
    <div className='flex w-full items-center justify-center gap-3'>
      <span className='font-semibold'>Filter: </span>

      <MultipleSelector
        onChange={handleSelect}
        options={categoriesOption}
        placeholder='Select categories...'
        emptyIndicator={
          <p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>
            no results found.
          </p>
        }
      />
    </div>
  )
}
