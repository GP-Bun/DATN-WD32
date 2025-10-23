import React from 'react'
import { Link } from 'react-router-dom'
import { products } from '../store/mockData'

export default function ProductsPage() {
  return (
    <section>
      <h2>Sản phẩm</h2>
      <div className="grid">
        {products.map((p) => (
          <article key={p.id} className="card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.price.toLocaleString('vi-VN')}đ</p>
            <Link to={`/san-pham/${p.id}`}>Xem chi tiết</Link>
          </article>
        ))}
      </div>
    </section>
  )
}
