<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class OrdersController extends Controller
{
    public function index()
    {
        $orders = Order::query()
            ->with('user:id,name')
            ->select(['id','user_id','final_amount','status','created_at'])
            ->latest('id')
            ->get()
            ->map(function($o){
                return [
                    'id' => $o->id,
                    'code' => str_pad((string)$o->id, 3, '0', STR_PAD_LEFT),
                    'customerName' => $o->user?->name ?? 'Khách hàng',
                    'total' => (float) $o->final_amount,
                    'status' => $o->status,
                    'createdAt' => $o->created_at?->toDateString(),
                ];
            });

        return response()->json($orders);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['pending','processing','shipped','delivered','cancelled'])],
        ]);
        $order->status = $data['status'];
        $order->save();
        return response()->json(['message' => 'status updated']);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->noContent();
    }
}


