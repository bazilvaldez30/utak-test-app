import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteData, getData, saveData, updateData } from './firebase/firebase'

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

export const useMenu = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: addMenuMutation } = useMutation({
    mutationFn: saveData,
    onSuccess: () => {
      queryClient.invalidateQueries(['menus'])
    },
  })

  const { mutateAsync: updateMenuMutation } = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries(['menus'])
    },
  })

  const { mutateAsync: deleteMenuMutation } = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries(['menus'])
    },
  })

  return {
    addMenuMutation,
    updateMenuMutation,
    deleteMenuMutation,
  }
}
