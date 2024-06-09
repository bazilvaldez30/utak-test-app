'use client'

import Link from 'next/link'
import React from 'react'

import { useNavbarScroll } from '../lib/hooks'
import { cn } from '@/lib/utils'
import { navmenuData } from '@/lib/datas'
import Image from 'next/image'

export default function Navbar() {
  const { isScrolled } = useNavbarScroll()

  return (
    <nav
      className={`fixed w-full top-0 z-50 w-ful border-gray-300 px-6 border-b dark:border-b-0`}
    >
      <div className='mx-auto flex max-w-6xl items-center justify-between'>
        <Link className='text-4xl font-extrabold' href='/'>
          <Image
            src='/images/utak-restaurant-logo.png'
            width={90}
            height={50}
            alt='logo'
          />
        </Link>

        <div className={`hidden gap-[2vw] text-[18px] xl:flex `}>
          {navmenuData.map((item) => (
            <Link
              key={item.name}
              className='menu-item-primary dark:text-custom-8 text-custom-12'
              href={item.link}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
