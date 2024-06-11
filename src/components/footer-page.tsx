export default function FooterPage() {
  return (
    <footer className='mb-10 px-4 text-center text-gray-500 mt-20 flex flex-col justify-center items-center'>
      <small className='mb-2 block'>
        &copy; 2024 Zil. All rights reserved.
      </small>
      <p className='max-w-3xl'>
        <span className='font-semibold text-sm '>About this website:</span>{' '}
        built with React & Next.js, Javascript, Tailwind CSS, Framer Motion,
        React Tanstack Query, Shadcn, Firebase, Vercel hosting.
      </p>
    </footer>
  )
}
