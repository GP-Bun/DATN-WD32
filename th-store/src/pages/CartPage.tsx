import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../store/CartContext'

export default function CartPage() {
  const { items, total, remove, clear } = useCart()

  return (
    <section>
      <h2>Giỏ hàng</h2>
      {items.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item, index) => (
              <div key={`${item.product.id}-${item.variant.size}-${item.variant.color}`} className="cart-item">
                <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>
                  <p>Màu: {item.variant.color}</p>
                  <p>Size: {item.variant.size}</p>
                  <p>Số lượng: {item.quantity}</p>
                </div>
                <div className="cart-item-price">
                  <p>{(item.product.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                  <button 
                    onClick={() => remove(item.product.id, item.variant)}
                    className="remove-btn"
                  >
                    Xoá
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              <strong>Tổng: {total.toLocaleString('vi-VN')}đ</strong>
            </div>
            <div className="cart-actions">
              <button onClick={clear} className="clear-btn">Xoá tất cả</button>
              <Link to="/thanh-toan" className="checkout-btn">Thanh toán</Link>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
