import { ref as databaseRef, set, push, get } from 'firebase/database'

import toast from 'react-hot-toast'
import { storage, db } from './firebaseConfig'
import { categoriesData } from '../datas'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export const saveData = async (data: Menu) => {
  const newDocRef = push(databaseRef(db, `menus/${data.category}`))
  set(newDocRef, data)
    .then(() => {
      toast.success('Menu added successfully')
    })
    .catch((error) => {
      toast.error('Error adding menu')
    })
}

const getAllData = async (): Promise<Menu[]> => {
  const menuDataPromises = categoriesData.map(async (category) => {
    const menuRef = databaseRef(db, `menus/${category}`)
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

const getFilteredData = async (filter: string[]): Promise<Menu[]> => {
  const menuDataPromises = filter.map(async (category) => {
    const menuRef = databaseRef(db, `menus/${category}`)
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

export const getData = async ({
  queryKey,
}: {
  queryKey: any
}): Promise<Menu[]> => {
  const [_, filter] = queryKey

  if (filter.length === 0) {
    return getAllData()
  } else {
    return getFilteredData(filter)
  }
}

export const updateData = async (data: Menu) => {
  const docRef = databaseRef(db, `menus/${data.category}/${data.id}`)
  set(docRef, data)
    .then(() => {
      toast.success('Menu updated successfully')
    })
    .catch((error) => {
      toast.error('Error updating menu')
    })
}

export const deleteData = async (data: Menu) => {
  const docRef = databaseRef(db, `menus/${data.category}/${data.id}`)
  set(docRef, null)
    .then(() => {
      toast.success('Menu deleted successfully')
    })
    .catch((error) => {
      toast.error('Error deleting menu')
    })
}

export const uploadFileToStorage = async (file: File) => {
  const storageRef = ref(storage, `images/${file.name}`)
  try {
    // Upload file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file)
    await uploadTask

    // Get download URL for the uploaded file
    const downloadURL = await getDownloadURL(storageRef)

    console.log(downloadURL)
    return downloadURL
  } catch (error) {
    console.error('Error uploading file:', error)
    throw new Error('Failed to upload file')
  }
}
