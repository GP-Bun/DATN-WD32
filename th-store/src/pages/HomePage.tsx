import { Link } from 'react-router-dom'
import { products } from '../store/mockData'

export default function HomePage() {
  const hotProducts = products.slice(0, 3) // Lấy 3 sản phẩm đầu làm hot

  return (
    <div className="home-page">
      {/* Banner Section */}
      <section className="banner">
        <div className="banner-content">
          <h1>TH Sneaker Store</h1>
          <p className="banner-subtitle">Thời trang, Hiện đại, Chất lượng</p>
          <p className="banner-description">
            Khám phá bộ sưu tập giày sneaker mới nhất với thiết kế độc đáo và chất lượng cao
          </p>
          <Link to="/san-pham" className="banner-cta">Khám phá ngay</Link>
        </div>
        <div className="banner-image">
          <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop" alt="TH Sneakers" />
        </div>
      </section>

      {/* Hot Products Section */}
      <section className="hot-products">
        <h2>Sản phẩm nổi bật</h2>
        <div className="products-grid">
          {hotProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">{product.price.toLocaleString('vi-VN')}đ</p>
                <Link to={`/san-pham/${product.id}`} className="product-link">Xem chi tiết</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all">
          <Link to="/san-pham" className="view-all-btn">Xem tất cả sản phẩm</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <div className="feature-icon">🚚</div>
          <h3>Giao hàng nhanh</h3>
          <p>Miễn phí vận chuyển toàn quốc</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🔒</div>
          <h3>Bảo mật</h3>
          <p>Thanh toán an toàn 100%</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💎</div>
          <h3>Chất lượng</h3>
          <p>Sản phẩm chính hãng</p>
        </div>
      </section>
    </div>
  )
}


