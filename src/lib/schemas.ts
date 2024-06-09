import { z } from 'zod'

/* const OptionSchema = z.object({
  size: z.string(),
  price: z.number(),
}) */

export const MenuSchema = z.object({
  id: z.string().nullable().optional(),
  category: z.string().min(1, { message: 'Category is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  /* options: z.array(OptionSchema).nullable().optional(), */
  price: z
    .number()
    .nonnegative({ message: 'Price must be a non-negative number' })
    .refine((value) => value !== 0, { message: 'Price cannot be zero' }),
  cost: z
    .number()
    .nonnegative({ message: 'Cost must be a non-negative number' })
    .refine((value) => value !== 0, { message: 'Cost cannot be zero' }),
  amountInStock: z
    .number()
    .nonnegative({ message: 'Amount in stock must be a non-negative number' })
    .refine((value) => value !== 0, {
      message: 'Amount in stock cannot be zero',
    }),
  image: z
    .string()
    .url({ message: 'Invalid URL format' })
    .min(1, { message: 'Image URL is required' }),
})
