import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products } from '../store/mockData'
import { useCart } from '../store/CartContext'

export default function ProductDetailPage() {
  const { id } = useParams()
  const product = products.find((p) => String(p.id) === String(id))
  const { add } = useCart()
  
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return <p>Không tìm thấy sản phẩm.</p>
  }

  const availableColors = [...new Set(product.variants.map(v => v.color))]
  const availableSizes = [...new Set(product.variants.map(v => v.size))]
  
  const selectedVariant = product.variants.find(v => 
    v.size === selectedSize && v.color === selectedColor
  )

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert('Vui lòng chọn size và màu sắc')
      return
    }
    if (quantity > selectedVariant.stock) {
      alert('Số lượng vượt quá tồn kho')
      return
    }
    add(product, selectedVariant, quantity)
    alert('Đã thêm vào giỏ hàng!')
  }

  return (
    <>
      <div className="back-link-bar">
        <Link to="/san-pham" className="back-link">
          ← Trở lại trang sản phẩm
        </Link>
      </div>
      <section className="product-detail">
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">{product.price.toLocaleString('vi-VN')}đ</p>
          <p>{product.description}</p>
          
          {/* Color Selection */}
          <div className="variant-section">
            <h3>Màu sắc:</h3>
            <div className="color-options">
              {availableColors.map(color => (
                <button
                  key={color}
                  className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="variant-section">
            <h3>Size:</h3>
            <div className="size-options">
              {availableSizes.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="variant-section">
            <h3>Số lượng:</h3>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >-</button>
              <span>{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                disabled={!selectedVariant || quantity >= selectedVariant.stock}
              >+</button>
            </div>
            {selectedVariant && (
              <p className="stock-info">Còn lại: {selectedVariant.stock} sản phẩm</p>
            )}
          </div>

          <button 
            onClick={handleAddToCart} 
            className="add-to-cart"
            disabled={!selectedVariant}
          >
            Thêm vào giỏ
          </button>
        </div>
      </section>
    </>
  )
}