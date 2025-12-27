import { useState, useEffect } from 'react'
import {
  fetchRevenueStatistics,
  fetchRecentOrders,
  formatCurrency,
  formatFullCurrency,
  type RevenueStatistics,
  type RevenueDataPoint,
  type RecentOrder
} from '../api/revenueApi'

type TabType = 'daily' | 'monthly' | 'yearly'

// SVG Icons
const Icons = {
  revenue: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  customers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  products: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  pieChart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  trendUp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  trendDown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  ),
  stats: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18" />
      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
    </svg>
  ),
  wallet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  arrowUp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  ),
  arrowDown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  )
}

const Dashboard = () => {
  const [stats, setStats] = useState<RevenueStatistics | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>('monthly')

  useEffect(() => {
    loadStatistics()
  }, [])

  const loadStatistics = async () => {
    setLoading(true)
    try {
      const [statsData, ordersData] = await Promise.all([
        fetchRevenueStatistics(),
        fetchRecentOrders()
      ])
      setStats(statsData)
      setRecentOrders(ordersData)
    } catch (error) {
      console.error('Failed to load statistics:', error)
    } finally {
      setLoading(false)
    }
  }

  const getChartData = (): RevenueDataPoint[] => {
    if (!stats) return []
    switch (activeTab) {
      case 'daily': return stats.daily
      case 'monthly': return stats.monthly
      case 'yearly': return stats.yearly
    }
  }

  const getMaxRevenue = (data: RevenueDataPoint[]) => {
    return Math.max(...data.map(d => d.revenue))
  }

  const chartData = getChartData()
  const maxRevenue = getMaxRevenue(chartData)
  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = chartData.reduce((sum, item) => sum + item.orders, 0)
  const avgRevenue = chartData.length > 0 ? totalRevenue / chartData.length : 0

  const getGrowth = () => {
    if (chartData.length < 2) return 0
    const current = chartData[chartData.length - 1].revenue
    const previous = chartData[chartData.length - 2].revenue
    return previous > 0 ? ((current - previous) / previous * 100) : 0
  }

  const growth = getGrowth()

  const topPeriods = [...chartData]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3)

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-title">
            <span className="icon-inline">{Icons.chart}</span>
            Dashboard Thống Kê
          </h1>
          <p className="dashboard-subtitle">Tổng quan hoạt động kinh doanh TH Store</p>
        </div>
        <div className="dashboard-header-right">
          <span className="dashboard-date">
            <span className="icon-sm">{Icons.calendar}</span>
            {new Date().toLocaleDateString('vi-VN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="dashboard-cards">
        <div className="dashboard-card card-revenue">
          <div className="card-icon">{Icons.revenue}</div>
          <div className="card-content">
            <span className="card-label">
              {activeTab === 'daily' ? 'Doanh thu 7 ngày' :
                activeTab === 'monthly' ? 'Doanh thu năm' : 'Doanh thu 5 năm'}
            </span>
            <span className="card-value">
              {loading ? '...' : formatCurrency(totalRevenue)}
            </span>
            <span className={`card-trend ${growth >= 0 ? 'positive' : 'negative'}`}>
              <span className="icon-xs">{growth >= 0 ? Icons.trendUp : Icons.trendDown}</span>
              {Math.abs(growth).toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="dashboard-card card-orders">
          <div className="card-icon">{Icons.orders}</div>
          <div className="card-content">
            <span className="card-label">Tổng đơn hàng</span>
            <span className="card-value">{loading ? '...' : totalOrders.toLocaleString()}</span>
            <span className="card-trend neutral">
              TB: {loading ? '...' : Math.round(totalOrders / chartData.length).toLocaleString()}/kỳ
            </span>
          </div>
        </div>

        <div className="dashboard-card card-customers">
          <div className="card-icon">{Icons.customers}</div>
          <div className="card-content">
            <span className="card-label">Khách hàng</span>
            <span className="card-value">{loading ? '...' : stats?.summary.totalCustomers.toLocaleString()}</span>
            <span className="card-trend positive">
              <span className="icon-xs">{Icons.trendUp}</span>
              12.5% tháng này
            </span>
          </div>
        </div>

        <div className="dashboard-card card-products">
          <div className="card-icon">{Icons.products}</div>
          <div className="card-content">
            <span className="card-label">Sản phẩm</span>
            <span className="card-value">{loading ? '...' : stats?.summary.totalProducts.toLocaleString()}</span>
            <span className="card-trend neutral">Đang hoạt động</span>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="dashboard-grid">
        {/* Revenue Bar Chart */}
        <div className="dashboard-panel panel-large">
          <div className="panel-header">
            <h3 className="panel-title">
              <span className="icon-inline">{Icons.stats}</span>
              Biểu đồ doanh thu
            </h3>
            <div className="panel-tabs">
              <button
                className={`panel-tab ${activeTab === 'daily' ? 'active' : ''}`}
                onClick={() => setActiveTab('daily')}
              >
                7 Ngày
              </button>
              <button
                className={`panel-tab ${activeTab === 'monthly' ? 'active' : ''}`}
                onClick={() => setActiveTab('monthly')}
              >
                12 Tháng
              </button>
              <button
                className={`panel-tab ${activeTab === 'yearly' ? 'active' : ''}`}
                onClick={() => setActiveTab('yearly')}
              >
                5 Năm
              </button>
            </div>
          </div>

          <div className="panel-content">
            {loading ? (
              <div className="chart-loading">
                <div className="loading-spinner"></div>
                <span>Đang tải dữ liệu...</span>
              </div>
            ) : (
              <div className="bar-chart">
                <div className="chart-bars">
                  {chartData.map((item, index) => {
                    const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0
                    const isHighest = item.revenue === maxRevenue
                    return (
                      <div key={index} className="bar-column">
                        <div className="bar-value-top">{formatCurrency(item.revenue)}</div>
                        <div className="bar-track">
                          <div
                            className={`bar-fill ${isHighest ? 'highest' : ''}`}
                            style={{ height: `${height}%` }}
                          />
                        </div>
                        <div className="bar-label">{item.label}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Conversion Stats */}
        <div className="dashboard-panel panel-small">
          <div className="panel-header">
            <h3 className="panel-title">
              <span className="icon-inline">{Icons.pieChart}</span>
              Tỷ lệ chuyển đổi
            </h3>
          </div>
          <div className="panel-content">
            {loading ? (
              <div className="chart-loading"><div className="loading-spinner"></div></div>
            ) : (
              <div className="conversion-stats">
                <div className="conversion-circle">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="45" fill="none"
                      stroke="url(#gradient)" strokeWidth="8"
                      strokeDasharray={`${75 * 2.83} ${100 * 2.83}`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="100%" stopColor="#764ba2" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="circle-value">75%</div>
                </div>
                <div className="conversion-info">
                  <div className="conversion-row">
                    <span className="dot blue"></span>
                    <span>Hoàn thành: 75%</span>
                  </div>
                  <div className="conversion-row">
                    <span className="dot gray"></span>
                    <span>Đang xử lý: 25%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders - below bar chart */}
        <div className="dashboard-panel panel-large">
          <div className="panel-header">
            <h3 className="panel-title">
              <span className="icon-inline">{Icons.orders}</span>
              Đơn hàng gần đây
            </h3>
          </div>
          <div className="panel-content">
            {loading ? (
              <div className="chart-loading"><div className="loading-spinner"></div></div>
            ) : (
              <div className="recent-orders">
                {recentOrders.map((order, index) => (
                  <div key={index} className="recent-order">
                    <div className={`order-status ${order.status}`}></div>
                    <div className="order-info">
                      <span className="order-id">#{order.id}</span>
                      <span className="order-customer">{order.customer}</span>
                    </div>
                    <div className="order-amount">{formatFullCurrency(order.amount)}</div>
                    <div className="order-time">{order.time}</div>
                  </div>
                ))}
                {recentOrders.length === 0 && (
                  <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
                    Chưa có đơn hàng nào
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Top Performers */}
        <div className="dashboard-panel panel-small">
          <div className="panel-header">
            <h3 className="panel-title">
              <span className="icon-inline">{Icons.trophy}</span>
              Top doanh thu
            </h3>
          </div>
          <div className="panel-content">
            {loading ? (
              <div className="chart-loading"><div className="loading-spinner"></div></div>
            ) : (
              <div className="top-list">
                {topPeriods.map((item, index) => (
                  <div key={index} className={`top-item rank-${index + 1}`}>
                    <div className={`top-rank rank-${index + 1}`}>
                      {index + 1}
                    </div>
                    <div className="top-info">
                      <span className="top-label">{item.label}</span>
                      <span className="top-value">{formatFullCurrency(item.revenue)}</span>
                    </div>
                    <div className="top-orders">{item.orders} đơn</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="dashboard-panel panel-full">
          <div className="panel-header">
            <h3 className="panel-title">
              <span className="icon-inline">{Icons.stats}</span>
              Thống kê nhanh
            </h3>
          </div>
          <div className="panel-content">
            <div className="quick-stats-grid">
              <div className="quick-stat">
                <div className="quick-stat-icon">{Icons.wallet}</div>
                <div className="quick-stat-info">
                  <span className="quick-stat-label">Doanh thu TB/kỳ</span>
                  <span className="quick-stat-value">{formatFullCurrency(avgRevenue)}</span>
                </div>
              </div>
              <div className="quick-stat">
                <div className="quick-stat-icon">{Icons.cart}</div>
                <div className="quick-stat-info">
                  <span className="quick-stat-label">Giá trị TB/đơn</span>
                  <span className="quick-stat-value">
                    {totalOrders > 0 ? formatFullCurrency(Math.round(totalRevenue / totalOrders)) : '0đ'}
                  </span>
                </div>
              </div>
              <div className="quick-stat">
                <div className="quick-stat-icon icon-green">{Icons.arrowUp}</div>
                <div className="quick-stat-info">
                  <span className="quick-stat-label">Cao nhất</span>
                  <span className="quick-stat-value">{formatFullCurrency(maxRevenue)}</span>
                </div>
              </div>
              <div className="quick-stat">
                <div className="quick-stat-icon icon-red">{Icons.arrowDown}</div>
                <div className="quick-stat-info">
                  <span className="quick-stat-label">Thấp nhất</span>
                  <span className="quick-stat-value">
                    {formatFullCurrency(Math.min(...chartData.map(d => d.revenue)))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard