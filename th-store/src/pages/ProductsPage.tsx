import { Link } from 'react-router-dom'

export default function ProductsPage() {
  const products = [
    { id: 1, name: 'Áo thun nam', price: 299000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop' },
    { id: 2, name: 'Quần jean nữ', price: 599000, image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=300&h=200&fit=crop' },
    { id: 3, name: 'Giày thể thao', price: 1299000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop' },
    { id: 4, name: 'Túi xách nữ', price: 899000, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop' },
    { id: 5, name: 'Đồng hồ nam', price: 1999000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop' },
    { id: 6, name: 'Áo khoác nữ', price: 1299000, image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=300&h=200&fit=crop' },
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
