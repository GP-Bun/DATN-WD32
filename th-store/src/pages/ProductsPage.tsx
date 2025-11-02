import { Link } from 'react-router-dom'

export default function ProductsPage() {
  const products = [
    { id: 1, name: 'Giày Sneaker TH Runner', price: 1299000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop' },
    { id: 2, name: 'Giày Thể Thao TH Sport', price: 1599000, image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&h=200&fit=crop' },
    { id: 3, name: 'Giày Chạy Bộ TH Run', price: 1399000, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=200&fit=crop' },
    { id: 4, name: 'Giày Sneaker Cổ Cao TH High', price: 1499000, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop' },
    { id: 5, name: 'Giày Bóng Đá TH Football', price: 1999000, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=200&fit=crop' },
    { id: 6, name: 'Giày Lifestyle TH Classic', price: 1199000, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&h=200&fit=crop' },
  ]

  return (
    <div className="main">
      <h1>Sản phẩm</h1>
      <div className="grid">
        {products.map(product => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">{product.price.toLocaleString('vi-VN')}đ</p>
            <Link to={`/san-pham/${product.id}`}>Xem chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
