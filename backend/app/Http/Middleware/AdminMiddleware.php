<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user(); // Lấy user từ token Sanctum

        if (!$user) {
            return response()->json(['message' => 'Bạn chưa đăng nhập!'], 401);
        }

        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Bạn không có quyền truy cập khu vực quản trị!'], 403);
        }

        return $next($request);
    }
}
