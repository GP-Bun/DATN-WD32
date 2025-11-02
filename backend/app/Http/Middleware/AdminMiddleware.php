<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $admin = $request->user(); // token đã xác thực
        if ($admin) return $next($request);

        return response()->json(['message' => 'Chỉ admin mới truy cập được'], 403);
    }
}
