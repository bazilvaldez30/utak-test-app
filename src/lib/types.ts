interface INavMenuData {
  name: string
  link: string
}

interface ThemeContextType {
  theme: string
  toggleTheme: () => void
}

interface Option {
  size: string
  price: number
}

interface Menu {
  category: string
  name: string
  options?: Option[]
  price: number
  cost: number
  amountInStock: number
  image: string
}
