import React from 'react'

export default function Footer() {
  return (
    <footer className='mb-10 px-4 text-center text-gray-500 mt-20 flex flex-col justify-center items-center'>
      <small className='mb-2 block'>
        &copy; 2024 Zil. All rights reserved.
      </small>
      <p className='max-w-3xl'>
        <span className='font-semibold text-sm '>About this website:</span>{' '}
        built with React & Next.js (App Router & Server Actions), Javascript,
        Tailwind CSS, Framer Motion, Firebase Vercel hosting.
      </p>
    </footer>
  )
}
