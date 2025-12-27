<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Tất cả các route ở đây sẽ được truy cập qua đường dẫn bắt đầu bằng /api
| Ví dụ: http://127.0.0.1:8000/api/test
|--------------------------------------------------------------------------
*/

//  Route kiểm tra kết nối API
Route::get('/test', function () {
    return response()->json(['message' => 'API OK!']);
});

//  Route test public (không cần đăng nhập)
Route::get('/products', function () {
    return response()->json([
        ['id' => 1, 'name' => 'Nike Air Force 1', 'price' => 3200000],
        ['id' => 2, 'name' => 'Adidas Superstar', 'price' => 2800000],
        ['id' => 3, 'name' => 'Converse Chuck Taylor', 'price' => 1500000],
    ]);
});

// Đăng ký và đăng nhập (public routes)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//  Các route cần đăng nhập (bảo vệ bằng Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user-profile', function (Request $request) {
        return response()->json([
            'message' => 'Lấy thông tin người dùng thành công!',
            'user' => $request->user()
        ]);
    });

    Route::post('/user-profile', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Admin Routes

Route::prefix('admin')->group(function () {
    // Admin register & login
    Route::post('register', [AdminAuthController::class, 'register']);
    Route::post('login', [AdminAuthController::class, 'login']);

    // Admin routes cần login
    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::post('logout', [AdminAuthController::class, 'logout']);
        Route::get('dashboard', function () {
            return ['message' => 'Chào mừng Admin!'];
        });

        // Thêm các route admin khác ở đây (Orders, Products, Users...)
    });

    // Statistics routes (public for now, move to protected later)
    Route::get('statistics/revenue', function () {
        // Generate consistent mock data for revenue statistics
        $dailyRevenue = [];
        $monthlyRevenue = [];
        $yearlyRevenue = [];

        // Fixed seed for consistent data (based on current date)
        $seed = (int) now()->format('Ymd');
        srand($seed);

        // Last 7 days - realistic daily revenue
        $dailyBase = [15200000, 18500000, 12300000, 22100000, 28700000, 19800000, 16400000];
        $dailyOrderBase = [23, 31, 18, 42, 55, 35, 28];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $index = 6 - $i;
            $dailyRevenue[] = [
                'date' => $date->format('Y-m-d'),
                'label' => $date->format('d/m'),
                'revenue' => $dailyBase[$index],
                'orders' => $dailyOrderBase[$index],
            ];
        }

        // Last 12 months - realistic monthly revenue
        $monthlyBase = [245000000, 312000000, 289000000, 367000000, 423000000, 398000000, 
                        456000000, 489000000, 512000000, 478000000, 534000000, 387000000];
        $monthlyOrderBase = [420, 485, 512, 598, 687, 645, 723, 801, 856, 789, 912, 623];
        for ($i = 11; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $index = 11 - $i;
            $monthlyRevenue[] = [
                'date' => $date->format('Y-m'),
                'label' => 'T' . $date->format('m/Y'),
                'revenue' => $monthlyBase[$index],
                'orders' => $monthlyOrderBase[$index],
            ];
        }

        // Last 5 years - realistic yearly revenue
        $yearlyBase = [2150000000, 2890000000, 3560000000, 4230000000, 4890000000];
        $yearlyOrderBase = [3200, 4512, 5687, 7234, 8051];
        for ($i = 4; $i >= 0; $i--) {
            $year = now()->subYears($i)->year;
            $index = 4 - $i;
            $yearlyRevenue[] = [
                'date' => (string)$year,
                'label' => (string)$year,
                'revenue' => $yearlyBase[$index],
                'orders' => $yearlyOrderBase[$index],
            ];
        }

        // Summary - calculated from actual data for consistency
        $todayData = $dailyRevenue[6]; // Today (last item)
        $thisMonthData = $monthlyRevenue[11]; // This month (last item)
        $yearTotal = array_sum(array_column($yearlyRevenue, 'revenue'));
        $yearOrders = array_sum(array_column($yearlyRevenue, 'orders'));

        $summary = [
            'totalRevenue' => $yearTotal,
            'totalOrders' => $yearOrders,
            'totalCustomers' => 3245,
            'totalProducts' => 186,
            'todayRevenue' => $todayData['revenue'],
            'todayOrders' => $todayData['orders'],
            'monthRevenue' => $thisMonthData['revenue'],
            'monthOrders' => $thisMonthData['orders'],
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'daily' => $dailyRevenue,
                'monthly' => $monthlyRevenue,
                'yearly' => $yearlyRevenue,
                'summary' => $summary,
            ]
        ]);
    });

    // Recent orders endpoint
    Route::get('statistics/recent-orders', function () {
        $statuses = ['completed', 'processing', 'pending', 'cancelled'];
        $names = [
            'Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D',
            'Hoàng Văn E', 'Vũ Thị F', 'Đặng Văn G', 'Bùi Thị H'
        ];
        
        $orders = [];
        for ($i = 0; $i < 6; $i++) {
            $minutesAgo = rand(5, 120);
            $orders[] = [
                'id' => 'DH-' . date('Y') . str_pad(rand(1, 999), 3, '0', STR_PAD_LEFT),
                'customer' => $names[array_rand($names)],
                'amount' => rand(500000, 5000000),
                'status' => $statuses[array_rand($statuses)],
                'time' => $minutesAgo < 60 
                    ? $minutesAgo . ' phút trước' 
                    : floor($minutesAgo / 60) . ' giờ trước',
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $orders
        ]);
    });
});


