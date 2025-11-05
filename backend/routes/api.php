<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;

// ✅ Route test
Route::get('/test', fn() => response()->json(['message' => 'API OK!']));

// ✅ User routes (public)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ✅ User routes (private)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user-profile', function (Request $request) {
        return response()->json([
            'message' => 'Lấy thông tin người dùng thành công!',
            'user' => $request->user(),
        ]);
    });

    Route::post('/user-profile', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// ✅ Admin routes
Route::prefix('admin')->group(function () {
    Route::post('/register', [AdminAuthController::class, 'register']);
    Route::post('/login', [AdminAuthController::class, 'login']);

    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::get('/dashboard', fn() => ['message' => 'Chào mừng Admin!']);
    });
});
