import api from '../../api'

// Types
export interface RevenueDataPoint {
    date: string
    label: string
    revenue: number
    orders: number
}

export interface RevenueSummary {
    totalRevenue: number
    totalOrders: number
    totalCustomers: number
    totalProducts: number
    todayRevenue: number
    todayOrders: number
    monthRevenue: number
    monthOrders: number
}

export interface RevenueStatistics {
    daily: RevenueDataPoint[]
    monthly: RevenueDataPoint[]
    yearly: RevenueDataPoint[]
    summary: RevenueSummary
}

// Empty fallback when API fails (no mock data here - it's on backend)
const emptyRevenueData: RevenueStatistics = {
    daily: [],
    monthly: [],
    yearly: [],
    summary: {
        totalRevenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalProducts: 0,
        todayRevenue: 0,
        todayOrders: 0,
        monthRevenue: 0,
        monthOrders: 0,
    }
}

// Fetch revenue statistics from API only
export async function fetchRevenueStatistics(): Promise<RevenueStatistics> {
    try {
        const response = await api.get('/admin/statistics/revenue')
        if (response.data.success) {
            return response.data.data
        }
        throw new Error('API returned unsuccessful')
    } catch (error) {
        console.error('Failed to fetch revenue from API:', error)
        // Return empty data - UI will show empty state
        return emptyRevenueData
    }
}

// Format currency VND
export function formatCurrency(amount: number): string {
    if (amount >= 1000000000) {
        return (amount / 1000000000).toFixed(1) + 'B'
    }
    if (amount >= 1000000) {
        return (amount / 1000000).toFixed(1) + 'M'
    }
    if (amount >= 1000) {
        return (amount / 1000).toFixed(0) + 'K'
    }
    return amount.toLocaleString('vi-VN')
}

export function formatFullCurrency(amount: number): string {
    return amount.toLocaleString('vi-VN') + 'đ'
}

// Recent Orders Types
export interface RecentOrder {
    id: string
    customer: string
    amount: number
    status: 'completed' | 'processing' | 'pending' | 'cancelled'
    time: string
}

// Fetch recent orders from API
export async function fetchRecentOrders(): Promise<RecentOrder[]> {
    try {
        const response = await api.get('/admin/statistics/recent-orders')
        if (response.data.success) {
            return response.data.data
        }
        throw new Error('API returned unsuccessful')
    } catch (error) {
        console.error('Failed to fetch recent orders from API:', error)
        return []
    }
}
