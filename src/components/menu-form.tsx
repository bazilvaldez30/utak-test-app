'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { CategoryMenu } from './menu-categories'
import toast from 'react-hot-toast'
import { saveData, uploadFileToStorage } from '@/lib/firebase/firebase'
import { MenuSchema } from '@/lib/schemas'
import { cn, validationErrorHandler } from '@/lib/utils'
import { set } from 'firebase/database'
import ErrorMsg from './error-msg'
import { useMenu } from '@/lib/hooks'

interface MenuFormProps {
  menu?: Menu
}

export default function MenuForm({ menu }: Readonly<MenuFormProps>) {
  const { addMenuMutation, updateMenuMutation, deleteMenuMutation } = useMenu()
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [formData, setFormData] = useState<Menu>({
    id: '',
    category: '',
    name: '',
    options: [],
    price: 0,
    cost: 0,
    amountInStock: 0,
    image: '',
  })

  useEffect(() => {
    if (menu) {
      setFormData(menu)
    }
  }, [menu])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target

    setFormData((prevData) => {
      let newValue: any = value

      // Special handling for number fields and options
      if (id === 'price' || id === 'cost') {
        newValue = parseFloat(value)
      } else if (id === 'amountInStock') {
        newValue = parseInt(value)
      } else if (id === 'options') {
        newValue = value.split(',').map((opt) => opt.trim())
      }

      return {
        ...prevData,
        [id]: newValue,
      }
    })
  }

  const handleChangeCategory = (category: string) => {
    setFormData((prevData) => ({
      ...prevData,
      category,
    }))
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

  const handleAddMenu = async (formData: Menu) => {
    await addMenuMutation(formData)
    setErrors({})
    setFormData({
      id: '',
      category: '',
      name: '',
      options: [],
      price: 0,
      cost: 0,
      amountInStock: 0,
      image: '',
    })
    setModalOpen(false)
  }

  const handleUpdateMenu = async (formData: Menu) => {
    await updateMenuMutation(formData)
    setModalOpen(false)
  }

  const handleSave = async () => {
    setLoading(true)

    let downloadURL = ''
    if (file) {
      try {
        downloadURL = await uploadFileToStorage(file)

        setFormData((prevData) => ({
          ...prevData,
          image: downloadURL,
        }))
      } catch (error) {
        setLoading(false)
        return
      }
    }

    const updatedFormData = {
      ...formData,
      image: downloadURL || formData.image,
    }

    const validationResult = MenuSchema.safeParse(updatedFormData)
    if (!validationResult.success) {
      const errorMsgs = validationErrorHandler(validationResult.error.errors)
      setErrors(errorMsgs)
      setLoading(false)
      return
    }

    if (menu) {
      await handleUpdateMenu(updatedFormData)
    } else {
      await handleAddMenu(updatedFormData)
    }

    setLoading(false)
  }

  const handleDelete = async () => {
    await deleteMenuMutation(formData)
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        {menu ? (
          <button className='bg-gray-200 dark:bg-gray-700 hover:dark:bg-gray-600 text-white mb-5 py-2 px-3 rounded-md hover:scale-[1.15] hover:bg-gray-300'>
            <FiEdit className='icon text-blue-500' />
          </button>
        ) : (
          <button className='button-primary ms-auto rounded-lg text-black bg-custom-2 px-8 py-3 pe-6 flex'>
            Add Menu <FaPlus className='text-xl' />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>{menu ? 'Edit Menu' : 'Add Menu'}</DialogTitle>
          <DialogDescription>
            {menu
              ? "Make changes to your Menu here. Click save when you're done."
              : "Add your Menu here. Click 'Add menu' when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          {errors.category && <ErrorMsg>{errors.category}</ErrorMsg>}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='category' className='text-right'>
              Category
            </Label>
            <CategoryMenu handleChangeCategory={handleChangeCategory} />
          </div>
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              onChange={handleChange}
              id='name'
              placeholder='Menu Name'
              className='col-span-3'
              value={formData.name}
            />
          </div>
          {errors.options && <ErrorMsg>{errors.options}</ErrorMsg>}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='options' className='text-right'>
              Options
            </Label>
            <Input
              onChange={handleChange}
              id='options'
              placeholder='Small, Medium, Large'
              className='col-span-3'
              value={formData.options?.join(', ')}
            />
          </div>
          {errors.price && <ErrorMsg>{errors.price}</ErrorMsg>}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='price' className='text-right'>
              Price
            </Label>
            <Input
              onChange={handleChange}
              id='price'
              placeholder='0.00'
              type='number'
              step='0.01'
              className='col-span-3'
              value={formData.price || ''}
            />
          </div>
          {errors.cost && <ErrorMsg>{errors.cost}</ErrorMsg>}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='cost' className='text-right'>
              Cost
            </Label>
            <Input
              onChange={handleChange}
              id='cost'
              placeholder='0.00'
              type='number'
              step='0.01'
              className='col-span-3'
              value={formData.cost || ''}
            />
          </div>
          {errors.amountInStock && <ErrorMsg>{errors.amountInStock}</ErrorMsg>}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='amountInStock' className='text-right'>
              Amount In Stock
            </Label>
            <Input
              onChange={handleChange}
              id='amountInStock'
              placeholder='0'
              type='number'
              className='col-span-3'
              value={formData.amountInStock || ''}
            />
          </div>

          {errors.image && <ErrorMsg>{errors.image}</ErrorMsg>}

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='image' className='text-right'>
              Image
            </Label>
            <Input
              onChange={handleChangeImage}
              type='file'
              id='image'
              placeholder='Upload image'
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <div className={`${menu && 'flex justify-between w-full'}`}>
            {menu && (
              <button
                onClick={handleDelete}
                disabled={loading}
                className={cn(
                  `button-primary !bg-custom-1 rounded-lg`,
                  loading && 'opacity-50 cursor-not-allowed'
                )}
              >
                Delete menu
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={loading}
              className={cn(
                `button-primary bg-custom-3 rounded-lg hover:bg-blue-900`,
                loading && 'opacity-50 cursor-not-allowed'
              )}
            >
              {menu ? 'Save changes' : 'Add Menu'}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
