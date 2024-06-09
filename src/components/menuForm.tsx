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



import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { CategoryMenu } from './category-menu'

export default function MenuForm({ menu }: { menu: Menu }) {
  const { addAssetMutation, updateAssetMutation } = useAssets()

  const [formData, setFormData] = React.useState<Menu>({
    category: '',
    name: '',
    options: [],
    price: 0,
    amountInStock: 0,
    image: '',
  })

  if (!record) {
    console.log(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    console.log(id, value)
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleChangeCategory = (category: string) => {
    setFormData((prevData) => ({
      ...prevData,
      category,
    }))
  }

  const handleSave = async () => {
    if (record) {
      // update asset
      return await updateAssetMutation(formData)
    }

    // create asset
    await addAssetMutation(formData)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {record ? (
          <button className='button-primary m-0 bg-white p-0 hover:scale-125'>
            <FiEdit className='icon text-blue-600' />
          </button>
        ) : (
          <button className='button-primary mb-5 ms-auto rounded-lg bg-custom-1 px-8 py-3 pe-6'>
            Add Asset <FaPlus className='text-xl' />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{record ? 'Edit Asset' : 'Add Asset'}</DialogTitle>
          <DialogDescription>
            {record
              ? "Make changes to your Assets here. Click save when you're done."
              : "Add your Asset here. Click 'Add asset' when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='serial_number' className='text-right'>
              Category
            </Label>
            <CategoryMenu handleChangeCategory={handleChangeCategory} />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='serial_number' className='text-right'>
              Serial Number
            </Label>
            <Input
              onChange={handleChange}
              id='serial_number'
              placeholder='D-1234567890'
              className='col-span-3'
              value={formData?.serial_number}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              onChange={handleChange}
              id='name'
              placeholder='Pedro Duarte'
              className='col-span-3'
              value={formData?.name}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Description
            </Label>
            <Input
              onChange={handleChange}
              id='description'
              placeholder='ROG Strix G153RC'
              className='col-span-3'
              value={formData?.description}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSave} className=' bg-custom-3'>
              {record ? 'Save changes' : 'Add Asset'}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
