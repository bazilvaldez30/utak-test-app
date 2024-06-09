'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { categoriesData } from '@/lib/datas'

// Define the MenuCategory type

// Define the props for the CategoryMenu component
interface CategoryMenuProps {
  handleChangeCategory: (category: string) => void
}

export function CategoryMenu({ handleChangeCategory }: CategoryMenuProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  const selectedFramework = categoriesData.find(
    (framework) => framework === value
  )

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? '' : currentValue)
    setOpen(false)
    handleChangeCategory(currentValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[335px] justify-between'
        >
          {selectedFramework ? selectedFramework : 'Select Category...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[335px] p-0'>
        <Command>
          <CommandInput placeholder='Search menu...' />
          <CommandList>
            <CommandEmpty>No Category found.</CommandEmpty>
            <CommandGroup>
              {categoriesData.map((category) => (
                <CommandItem
                  id='category'
                  key={category}
                  value={category}
                  onSelect={(currentValue) => {
                    handleSelect(currentValue)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === category ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {category}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
