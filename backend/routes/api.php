<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\OrdersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Admin APIs
Route::prefix('admin')->group(function () {
    // Products CRUD
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    // Users CRUD + status
    Route::get('/users', [UsersController::class, 'index']);
    Route::post('/users', [UsersController::class, 'store']);
    Route::put('/users/{user}', [UsersController::class, 'update']);
    Route::patch('/users/{user}/status', [UsersController::class, 'updateStatus']);
    Route::delete('/users/{user}', [UsersController::class, 'destroy']);

    // Orders list + status + delete
    Route::get('/orders', [OrdersController::class, 'index']);
    Route::patch('/orders/{order}/status', [OrdersController::class, 'updateStatus']);
    Route::delete('/orders/{order}', [OrdersController::class, 'destroy']);
});
