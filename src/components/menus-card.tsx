'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaEye } from 'react-icons/fa'
import MenuForm from './menu-form'

interface ProductCardProps {
  item: Menu
}

export default function MenusCard({ item }: Readonly<ProductCardProps>) {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <motion.div
      className='flex flex-col justify-between gap-3 rounded-lg dark:bg-[#ffffff09] dark:bg-opacity-65 font-semibold relative border dark:border-gray-600 border-gray-200 shadow-md hover:scale-[1.05]'
      variants={variants}
      initial='hidden'
      animate='visible'
      transition={{
        delay: 0.25,
        ease: 'easeInOut',
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
    >
      <Link href={`/product/${item.name}`}>
        <p className='text-[10px] absolute top-5 left-5 dark:bg-gray-800 bg-gray-200 dark:text-white rounded-full p-1 px-3 text-gray-950 tracking-wider'>
          {item.category}
        </p>
        <img
          src={item.image}
          alt={item.name}
          className='inline-block w-full p-3'
        />

        <div className='px-5 pb-4 pt-2'>
          {item.options && item.options.length > 0 ? (
            item.options.map((option) => (
              <p
                key={option.size}
                className='text-sm text-blue-600 dark:text-blue-300 capitalize'
              >
                {option ? `${option} -` : ''} P{item.price}
              </p>
            ))
          ) : (
            <p className='text-sm text-blue-600 dark:text-blue-300'>
              P{item.price}
            </p>
          )}
        </div>
        <p className='text-md px-5 capitalize'>{item.name}</p>
      </Link>
      <div className='flex px-5 gap-2'>
        <button className='bg-gradient-to-r from-blue-900 to-blue-500 text-white w-full mb-5 py-2 rounded-md hover:scale-[1.05] hover:bg-blue-600 dark:hover:bg-blue-800'>
          ADD TO CART
        </button>

        <MenuForm menu={item} />
      </div>
    </motion.div>
  )
}
