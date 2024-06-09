import { useEffect, useState } from 'react'

export const useNavbarScroll = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    // Run handleScroll once when the component mounts
    handleScroll()

    // Attach handleScroll to the scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Cleanup: remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { isScrolled }
}
