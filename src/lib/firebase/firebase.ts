import { getDatabase, ref, set, push, get } from 'firebase/database'

import toast from 'react-hot-toast'
import app from './firebaseConfig'
import { categoriesData } from '../datas'

export const saveData = async (data: Menu) => {
  const db = getDatabase(app)
  const newDocRef = push(ref(db, `menus/${data.category}`))
  set(newDocRef, data)
    .then(() => {
      toast.success('Menu added successfully')
    })
    .catch((error) => {
      toast.error('Error adding menu')
    })
}

export const getData = async (): Promise<Menu[]> => {
  const db = getDatabase()
  const menuDataPromises = categoriesData.map(async (category) => {
    const menuRef = ref(db, `menus/${category}`)
    const snapshot = await get(menuRef)
    if (snapshot.exists()) {
      const menuData = Object.values(snapshot.val()) as Menu[] // Cast to Menu[]
      return menuData
    } else {
      return []
    }
  })

  const menuDataArrays = await Promise.all(menuDataPromises)
  // Flatten the array of arrays into a single array
  const allMenuData = menuDataArrays.flat()
  return allMenuData
}

export const updateData = async (data: Menu) => {
  const db = getDatabase(app)
  const docRef = ref(db, `menus/${data.category}/${data.id}`)
  set(docRef, data)
    .then(() => {
      toast.success('Menu updated successfully')
    })
    .catch((error) => {
      toast.error('Error updating menu')
    })
}

export const deleteData = async (data: Menu) => {
  const db = getDatabase(app)
  const docRef = ref(db, `menus/${data.category}/${data.id}`)
  set(docRef, null)
    .then(() => {
      toast.success('Menu deleted successfully')
    })
    .catch((error) => {
      toast.error('Error deleting menu')
    })
}
