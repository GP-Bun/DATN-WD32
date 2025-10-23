import React, { useState } from 'react'
import { useCart } from '../store/CartContext'

export default function CheckoutPage() {
  const { items, total, clear } = useCart()
  const [submitted, setSubmitted] = useState(false)

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (items.length === 0) return
    setSubmitted(true)
    clear()
  }

  if (submitted) {
    return (
      <section>
        <h2>Đặt hàng thành công</h2>
        <p>Cảm ơn bạn đã mua hàng tại TH!</p>
      </section>
    )
  }

  return (
    <section>
      <h2>Thanh toán</h2>
      <p>Tổng thanh toán: <strong>{total.toLocaleString('vi-VN')}đ</strong></p>
      <form className="checkout-form" onSubmit={onSubmit}>
        <input placeholder="Họ và tên" required />
        <input placeholder="Địa chỉ" required />
        <input placeholder="Số điện thoại" required />
        <button type="submit" disabled={items.length === 0}>Đặt hàng</button>
      </form>
    </section>
  )
}
