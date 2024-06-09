import Menus from '@/components/menus'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between pt-28 bg-custom-radial dark:bg-custom-12 bg-white transform duration-1000 transition-all'>
      <Menus />
    </main>
  )
}
