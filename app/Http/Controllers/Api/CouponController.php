<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class CouponController extends Controller
{
    public function index(Request $request)
    {
        $query = Coupon::query();

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        $coupons = $query->orderBy('created_at', 'desc')->paginate(10);

        return response()->json([
            'status' => 'success',
            'data' => $coupons
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'nullable|unique:coupons,code',
            'type' => 'required|in:fixed,percentage',
            'value' => 'required|numeric',
            'min_purchase' => 'required|numeric',
            'max_discount' => 'nullable|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'usage_limit' => 'nullable|integer',
            'description' => 'nullable|string'
        ]);

        $coupon = Coupon::create([
            'code' => $request->code ?? strtoupper(Str::random(8)),
            'type' => $request->type,
            'value' => $request->value,
            'min_purchase' => $request->min_purchase,
            'max_discount' => $request->max_discount,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'usage_limit' => $request->usage_limit,
            'description' => $request->description,
            'status' => 'active'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Coupon created successfully',
            'data' => $coupon
        ], Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $coupon = Coupon::with('redemptions.order')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $coupon
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'type' => 'sometimes|required|in:fixed,percentage',
            'value' => 'sometimes|required|numeric',
            'min_purchase' => 'sometimes|required|numeric',
            'max_discount' => 'nullable|numeric',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date|after:start_date',
            'usage_limit' => 'nullable|integer',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|in:active,inactive'
        ]);

        $coupon = Coupon::findOrFail($id);
        $coupon->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Coupon updated successfully',
            'data' => $coupon
        ]);
    }

    public function destroy($id)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Coupon deleted successfully'
        ]);
    }

    public function verify(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'amount' => 'required|numeric'
        ]);

        $coupon = Coupon::where('code', $request->code)
            ->where('status', 'active')
            ->where('start_date', '<=', now())
            ->where('end_date', '>=', now())
            ->first();

        if (!$coupon) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid or expired coupon'
            ], Response::HTTP_BAD_REQUEST);
        }

        // Check minimum purchase amount
        if ($request->amount < $coupon->min_purchase) {
            return response()->json([
                'status' => 'error',
                'message' => 'Minimum purchase amount not met',
                'min_purchase' => $coupon->min_purchase
            ], Response::HTTP_BAD_REQUEST);
        }

        // Check usage limit
        if ($coupon->usage_limit && $coupon->redemptions()->count() >= $coupon->usage_limit) {
            return response()->json([
                'status' => 'error',
                'message' => 'Coupon usage limit exceeded'
            ], Response::HTTP_BAD_REQUEST);
        }

        // Calculate discount
        $discount = $coupon->type === 'percentage' 
            ? ($request->amount * $coupon->value / 100)
            : $coupon->value;

        // Apply max discount if set
        if ($coupon->max_discount && $discount > $coupon->max_discount) {
            $discount = $coupon->max_discount;
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'coupon' => $coupon,
                'discount' => $discount,
                'final_amount' => $request->amount - $discount
            ]
        ]);
    }
}