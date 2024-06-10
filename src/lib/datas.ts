import { Option } from '@/components/ui/multi-selector'

export const navmenuData: INavMenuData[] = [
  { name: 'Home', link: 'landing-page' },
  { name: 'About', link: 'about-us' },
  { name: 'Menu', link: 'menu' },
  { name: 'Inquiry', link: 'inquiry' },
]

export const menuItems: Menu[] = [
  {
    id: '1',
    category: 'Food',
    name: 'Fries',
    options: [
      { size: 'Small', price: 1.99 },
      { size: 'Medium', price: 2.99 },
      { size: 'Large', price: 3.99 },
    ],
    price: 0, // Only used if there are no options
    cost: 1.0,
    amountInStock: 50,
    image: 'https://via.placeholder.com/150?text=Fries',
  },
  {
    id: '2',
    category: 'Food',
    name: 'Burger',
    options: [],
    price: 5.99,
    cost: 3.0,
    amountInStock: 30,
    image: 'https://via.placeholder.com/150?text=Burger',
  },
  {
    id: '3',
    category: 'Drink',
    name: 'Cola',
    options: [
      { size: 'Small', price: 1.5 },
      { size: 'Medium', price: 2.0 },
      { size: 'Large', price: 2.5 },
    ],
    price: 0, // Only used if there are no options
    cost: 0.5,
    amountInStock: 100,
    image: 'https://via.placeholder.com/150?text=Cola',
  },
  {
    id: '4',
    category: 'Dessert',
    name: 'Ice Cream',
    options: [
      { size: 'Single Scoop', price: 1.99 },
      { size: 'Double Scoop', price: 2.99 },
    ],
    price: 0, // Only used if there are no options
    cost: 1.0,
    amountInStock: 20,
    image: 'https://via.placeholder.com/150?text=Ice+Cream',
  },
  {
    id: '5',
    category: 'Food',
    name: 'Pizza',
    options: [
      { size: 'Small', price: 8.99 },
      { size: 'Medium', price: 10.99 },
      { size: 'Large', price: 12.99 },
    ],
    price: 0, // Only used if there are no options
    cost: 5.0,
    amountInStock: 10,
    image: 'https://via.placeholder.com/150?text=Pizza',
  },
]

export const categoriesData: string[] = [
  'Food',
  'Drinks',
  'Desserts',
  'Snacks',
  'Others',
]

export const categoriesOption: Option[] = [
  {
    label: 'Food',
    value: 'Food',
  },
  {
    label: 'Drinks',
    value: 'Drinks',
  },
  {
    label: 'Desserts',
    value: 'Desserts',
  },
  {
    label: 'Snacks',
    value: 'Snacks',
  },
  {
    label: 'Others',
    value: 'Others',
  },
]
