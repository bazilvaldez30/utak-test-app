import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodIssue } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validationErrorHandler(errors: ZodIssue[]): {
  [key: string]: string
} {
  const newErrors: { [key: string]: string } = {}
  errors.forEach((err) => {
    const key = err.path.join('.')
    newErrors[key] = err.message
  })
  return newErrors
}
