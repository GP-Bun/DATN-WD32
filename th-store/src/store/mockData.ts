export type ProductVariant = {
  size: string
  color: string
  stock: number
}

export type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
  variants: ProductVariant[]
}

export const products: Product[] = [
  {
    id: 1,
    name: 'TH Runner 1',
    description: 'Giày chạy bộ nhẹ, êm ái cho mọi hành trình.',
    price: 1299000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
    variants: [
      { size: '39', color: 'Đen', stock: 10 },
      { size: '40', color: 'Đen', stock: 15 },
      { size: '41', color: 'Đen', stock: 8 },
      { size: '42', color: 'Đen', stock: 12 },
      { size: '39', color: 'Trắng', stock: 5 },
      { size: '40', color: 'Trắng', stock: 7 },
      { size: '41', color: 'Trắng', stock: 3 },
      { size: '42', color: 'Trắng', stock: 6 },
    ]
  },
  {
    id: 2,
    name: 'TH Street 2',
    description: 'Sneaker phong cách đường phố, cá tính.',
    price: 1499000,
    image: 'https://images.unsplash.com/photo-1526178613601-1c46ae744074?q=80&w=1200&auto=format&fit=crop',
    variants: [
      { size: '39', color: 'Xanh Navy', stock: 8 },
      { size: '40', color: 'Xanh Navy', stock: 12 },
      { size: '41', color: 'Xanh Navy', stock: 6 },
      { size: '42', color: 'Xanh Navy', stock: 9 },
      { size: '39', color: 'Đỏ', stock: 4 },
      { size: '40', color: 'Đỏ', stock: 7 },
      { size: '41', color: 'Đỏ', stock: 5 },
      { size: '42', color: 'Đỏ', stock: 8 },
    ]
  },
  {
    id: 3,
    name: 'TH Classic 3',
    description: 'Thiết kế cổ điển, phù hợp mọi outfit.',
    price: 999000,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    variants: [
      { size: '39', color: 'Nâu', stock: 6 },
      { size: '40', color: 'Nâu', stock: 10 },
      { size: '41', color: 'Nâu', stock: 8 },
      { size: '42', color: 'Nâu', stock: 11 },
      { size: '39', color: 'Xám', stock: 3 },
      { size: '40', color: 'Xám', stock: 5 },
      { size: '41', color: 'Xám', stock: 4 },
      { size: '42', color: 'Xám', stock: 7 },
    ]
  },
]


